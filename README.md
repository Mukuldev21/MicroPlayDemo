# MicroPlay Demo
**Microservices made simple — tested end‑to‑end with Playwright.**

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Tested%20with-Playwright-blue?logo=microsoft)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-success)]()
[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red)]()

---

## 📖 About
MicroPlay Demo is an enterprise‑style reference project that demonstrates how distributed microservices can be orchestrated, integrated, and validated through modern end‑to‑end testing practices.

This environment simulates a production‑ready architecture with:

Independent services (Users & Orders) exposing RESTful APIs

Gateway layer for service aggregation and unified access

HTML‑based UI for lightweight client interaction

Playwright test suite ensuring reliability, regression coverage, and user‑journey validation.

---

## 🛠 Technologies Used
- **Node.js** (Express.js for services)
- **HTML + JavaScript** (UI)
- **Playwright** (end‑to‑end testing)
- **npm** (package management)
- **serve** (static file hosting)

---

## 🚀 How to Run

### Quick Start (Recommended)
Run all services and the UI concurrently with a single command:

    npm install
    npm start

### Manual Setup
If you prefer to run services individually:
1. Install dependencies:
   ```bash
   npm install express node-fetch
   npm install -D @playwright/test serve
   ```
2. Start services in separate terminals:
    
        node user-service/index.js
        node order-service/index.js
        node gateway/index.js

### UI Access
The UI will be accessible at: `http://localhost:3003`


3. Serve UI:

        npx serve ui

4. Run Playwright tests:

        npx playwright test

### API Testing
To test the microservices directly (bypassing the UI):
```bash
npx playwright test tests/api.spec.ts
```


