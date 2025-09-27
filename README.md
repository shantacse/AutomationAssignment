# Automation Assignment – SauceDemo Web App Tests

This repository contains an automation assignment for testing the **SauceDemo web application** using **Playwright** and **JavaScript**, with **Allure reports** for detailed test reporting and analysis.


## 🛠️ Technologies Used

- **IDE** → Visual Studio Code  
- **Playwright** → End-to-end testing framework for browser automation  
- **JavaScript (Node.js)** → Programming language for tests  
- **Allure Reporter** → Generates interactive HTML reports with steps, logs, and screenshots  
- **npm** → Dependency management and script execution  


## ✅ Test Scenarios

- **Q1 – Locked Out User** → Verify login fails and error message appears  
- **Q2 – Standard User Checkout** → Login, add multiple products, validate checkout and success message  
- **Q3 – Performance Glitch User** → Sort products, add to cart, and complete checkout  


## ⚙️ Installation & Setup

```bash
# Initialize project
npm init -y  

# Install Playwright
npm install -D @playwright/test  
npx playwright install  

# Install Allure reporter
npm install -D allure-playwright  

# Install Allure command-line globally
npm install -g allure-commandline
```

## 🌐 Test Environment
All test cases are executed on the SauceDemo web application:
🔗 [https://www.saucedemo.com/](https://www.saucedemo.com/)

## ▶️ Run Test Cases
```bash
# Run all tests
npm run test

# Run tests sequentially
npm run test:sequential

# Run individual tests
npm run test:q1
npm run test:q2
npm run test:q3

# Run in Debug mode
npm run test:debug

```

## 📊 Allure Reporting
```bash
# Generate report
npm run report:generate

# Open report
npm run report:open

# Serve report (if already generated)
npm run report:serve

# Generate & open in one step
npm run report
```

## 📂 Project Structure

```text
├── tests/                   # Test cases file for the assignment
│   ├── q1.spec.js           # Locked Out User login test
│   ├── q2.spec.js           # Standard User checkout test
│   ├── q3.spec.js           # Performance Glitch User checkout test
│
├── utils/                   # Reusable helper functions
│   └── authHelper.js        # Functions for login, logout, resetAppState
│
├── playwright.config.js     # Playwright configuration (browser, reporter, etc.)
├── package.json             # Project dependencies and test/report scripts
└── README.md                # Documentation and setup instructions
```

- **tests/** → Test cases for each scenario
- **utils/authHelper.js** → Helper functions: login, logout, resetAppState
- **playwright.config.js** → Browser, reporter, and execution configuration
- **package.json** → Dependencies and scripts

## 🔗 Official Documentation
- **Playwright** → https://playwright.dev/docs/intro
- **Allure** → https://allurereport.org/docs/
- **Node.js** → https://nodejs.org/en/docs