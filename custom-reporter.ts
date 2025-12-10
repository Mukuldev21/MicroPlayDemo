import { Reporter, FullResult, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

class CustomEmailReporter implements Reporter {
    private suiteStats: Map<string, { total: number; passed: number; failed: number }> = new Map();
    private total = 0;
    private passed = 0;
    private failed = 0;
    private skipped = 0;
    private failures: { title: string; error: string }[] = [];
    private startTime: Date = new Date();

    onBegin() {
        this.startTime = new Date();
    }

    onTestEnd(test: TestCase, result: TestResult) {
        this.total++;
        const suiteName = test.parent?.title || "Root Suite";

        // Init suite stats if needed
        if (!this.suiteStats.has(suiteName)) {
            this.suiteStats.set(suiteName, { total: 0, passed: 0, failed: 0 });
        }
        const currentSuite = this.suiteStats.get(suiteName)!;
        currentSuite.total++;

        if (result.status === 'passed') {
            this.passed++;
            currentSuite.passed++;
        } else if (result.status === 'failed' || result.status === 'timedOut') {
            this.failed++;
            currentSuite.failed++;
            this.failures.push({
                title: test.title,
                error: result.error?.message || "Unknown error"
            });
        } else if (result.status === 'skipped') {
            this.skipped++;
        }
    }

    async onEnd(result: FullResult) {
        const duration = (result.duration / 1000).toFixed(2);
        const passRate = this.total > 0 ? ((this.passed / this.total) * 100).toFixed(0) : 0;
        const date = new Date().toLocaleString();

        const suiteRows = Array.from(this.suiteStats.entries()).map(([name, stats]) => `
            <tr>
                <td style="text-align: left; padding-left: 20px;">${name}</td>
                <td>${stats.total}</td>
                <td style="color: var(--success);">${stats.passed}</td>
                <td style="color: ${stats.failed > 0 ? 'var(--danger)' : 'var(--text-muted)'};">${stats.failed}</td>
                <td>
                    <div style="width: 100%; background: var(--progress-bg); height: 6px; border-radius: 3px;">
                        <div style="width: ${(stats.passed / stats.total) * 100}%; background: var(--success); height: 100%; border-radius: 3px;"></div>
                    </div>
                </td>
            </tr>
        `).join('');

        const failureSection = this.failures.length > 0 ? `
            <h3 style="color: var(--danger); margin-top: 30px;">❌ Failed Tests</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: var(--fail-bg); color: var(--danger-dark);">
                    <th style="text-align: left;">Test Case</th>
                    <th style="text-align: left;">Error</th>
                </tr>
                ${this.failures.map(f => `<tr><td>${f.title}</td><td style="font-family: monospace; font-size: 12px;">${f.error.substring(0, 100)}...</td></tr>`).join('')}
            </table>
        ` : '';

        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
    :root {
        --bg-body: #f8f9fa;
        --bg-card: #ffffff;
        --text-main: #2c3e50;
        --text-muted: #7f8c8d;
        --primary: #2980b9;
        --success: #27ae60;
        --danger: #c0392b;
        --danger-dark: #721c24;
        --warning: #f39c12;
        --border: #eeeeee;
        --header-bg: #f1f3f5;
        --fail-bg: #f8d7da;
        --progress-bg: #e0e0e0;
        --shadow: 0 4px 20px rgba(0,0,0,0.05);
    }

    [data-theme="dark"] {
        --bg-body: #1a1a1a;
        --bg-card: #2d2d2d;
        --text-main: #ecf0f1;
        --text-muted: #bdc3c7;
        --primary: #3498db;
        --success: #2ecc71;
        --danger: #e74c3c;
        --danger-dark: #ffcccc;
        --warning: #f1c40f;
        --border: #404040;
        --header-bg: #333333;
        --fail-bg: #5a2e2e;
        --progress-bg: #555555;
        --shadow: 0 4px 20px rgba(0,0,0,0.4);
    }

    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: var(--bg-body); padding: 20px; color: var(--text-main); transition: background 0.3s; }
    .container { background-color: var(--bg-card); padding: 30px; border-radius: 12px; max-width: 800px; margin: auto; box-shadow: var(--shadow); transition: background 0.3s; position: relative; }
    h2 { text-align: center; color: var(--text-main); margin-bottom: 5px; }
    .meta { text-align: center; color: var(--text-muted); font-size: 14px; margin-bottom: 25px; }
    
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; }
    .kpi-card { background: var(--bg-card); padding: 15px; text-align: center; border-radius: 8px; border: 1px solid var(--border); box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
    .kpi-val { font-size: 24px; font-weight: bold; margin: 5px 0; }
    .kpi-label { font-size: 13px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
    
    .text-green { color: var(--success); }
    .text-red { color: var(--danger); }
    .text-blue { color: var(--primary); }
    
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th { text-align: left; padding: 12px; background-color: var(--header-bg); color: var(--text-main); font-weight: 600; font-size: 14px; }
    td { padding: 12px; border-bottom: 1px solid var(--border); font-size: 14px; color: var(--text-main); }
    
    .theme-toggle {
        position: absolute; top: 20px; right: 20px;
        background: none; border: 1px solid var(--border);
        color: var(--text-main); padding: 5px 10px; border-radius: 20px;
        cursor: pointer; font-size: 12px;
    }
    .theme-toggle:hover { background: var(--header-bg); }

</style>
</head>
<body>
    <div class="container">
        <button class="theme-toggle" onclick="toggleTheme()">🌓 Theme</button>
        <h2>MicroServices Enterprise Report</h2>
        <div class="meta">Executed on ${date} • Duration: ${duration}s</div>

        <div class="kpi-grid">
            <div class="kpi-card" style="border-bottom: 4px solid var(--primary);">
                <div class="kpi-val text-blue">${this.total}</div>
                <div class="kpi-label">Total Tests</div>
            </div>
            <div class="kpi-card" style="border-bottom: 4px solid var(--success);">
                <div class="kpi-val text-green">${this.passed}</div>
                <div class="kpi-label">Passed</div>
            </div>
            <div class="kpi-card" style="border-bottom: 4px solid var(--danger);">
                <div class="kpi-val text-red">${this.failed}</div>
                <div class="kpi-label">Failed</div>
            </div>
            <div class="kpi-card" style="border-bottom: 4px solid var(--warning);">
                <div class="kpi-val" style="color: var(--text-main)">${passRate}%</div>
                <div class="kpi-label">Pass Rate</div>
            </div>
        </div>

        <h3>📁 Suite Summary</h3>
        <table>
            <thead>
                <tr>
                    <th>Suite Name</th>
                    <th>Total</th>
                    <th>Passed</th>
                    <th>Failed</th>
                    <th style="width: 100px;">Health</th>
                </tr>
            </thead>
            <tbody>
                ${suiteRows}
            </tbody>
        </table>

        ${failureSection}

        <p style="text-align: center; color: var(--text-muted); font-size: 12px; margin-top: 40px;">
            Generated by <strong>MicroPlay Enterprise Reporter</strong>
        </p>
    </div>

    <script>
        function toggleTheme() {
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem('theme', target);
        }
        
        // Auto-load theme
        const saved = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', saved);
    </script>
</body>
</html>
        `;

        const reportPath = path.join(__dirname, 'email-report.html');
        fs.writeFileSync(reportPath, htmlContent);
        console.log(`\n✨ Themed Report generated: ${reportPath}`);
    }
}

export default CustomEmailReporter;
