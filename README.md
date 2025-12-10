# MicroPlay Demo
**Microservices made simple — tested end‑to‑end with Playwright.**

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Tested%20with-Playwright-blue?logo=microsoft)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-success)]()
[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red)]()

---

## 📖 About
MicroPlay Demo is a lightweight learning project showcasing how **microservices** can be built, integrated, and tested using **Playwright**. It includes:
- Two backend services (Users & Orders)
- A gateway service for aggregation
- A simple HTML UI
- Playwright tests for end‑to‑end validation

---

## 🛠 Technologies Used
- **Node.js** (Express.js for services)
- **HTML + JavaScript** (UI)
- **Playwright** (end‑to‑end testing)
- **npm** (package management)
- **serve** (static file hosting)

---

## 🚀 How to Run
1. Install dependencies:
   ```bash
   npm install express node-fetch
   npm install -D @playwright/test serve
   ```
2. Start services in separate terminals:
    
        node user-service/index.js
        node order-service/index.js
        node gateway/index.js

3. Serve UI:

        npx serve ui

4. Run Playwright tests:

        npx playwright test


