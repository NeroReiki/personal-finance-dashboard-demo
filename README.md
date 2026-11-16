# Personal Finance Dashboard & Expense Tracker

### A Google Apps Script-powered personal finance web application

A personal finance management application built to organize income, expenses, accounts, and financial commitments in one place. It combines a lightweight web interface with Google Sheets as a data store and Google Apps Script for application logic.

> **Public demo:** The demonstration uses fictional financial data and is read-only. It is separate from the original personal finance tracker.

[**Try the Live Demo**](https://script.google.com/macros/s/AKfycbzQnDdzFDr9kobWvao3LqLxrWOZd0j8IlsHrxeS-Vaur5b0QEGDcsBNStDgAzg0Ku-g/exec) · [**View GitHub Repository**](https://github.com/NeroReiki/personal-finance-dashboard-demo) · [**View Portfolio Case Study**](https://my-universe-portfolio.vercel.app/projects/personal-finance-dashboard)

---

## Project overview

This project explores how Google Workspace tools can be used to build a practical, browser-based financial tracking application without setting up a conventional dedicated backend server.

The dashboard brings together financial records and visual summaries to make everyday tracking more accessible. The application is built with **Google Apps Script**, **Google Sheets**, **HTML**, **CSS**, and **JavaScript**, and uses **Chart.js** for charts and **Leaflet** for map-based spending visualization.

## Key features

| Feature | Description |
| --- | --- |
| Financial overview | Review account balances and financial activity in a dashboard. |
| Income and expense tracking | Record and categorize money coming in and going out in the original application. |
| Interactive charts | Explore spending by category, cash-flow trends, and income-versus-expense comparisons. |
| Transaction history | Browse records using search, filters, and pagination. |
| Multiple accounts | Monitor bank and e-wallet accounts together. |
| GPS spending map | Visualize spending locations through an interactive Leaflet map. |
| Loans and commitments | Track recurring financial obligations and loan-related information. |
| Side income monitoring | Review additional income with date filters. |
| Light and dark themes | Switch between interface themes. |
| Expandable charts | Enlarge charts for easier inspection. |

**Demo limitation:** The public demonstration is intended for viewing and exploration. It is **read-only** and uses **fictional data**; do not use it to store personal financial information.

## Technology stack

| Technology | Role |
| --- | --- |
| Google Apps Script | Application logic and integration with Google Sheets |
| Google Sheets | Spreadsheet-based data storage |
| HTML | User interface structure |
| CSS | Layout, responsiveness, and light/dark styling |
| JavaScript | Interface behavior, filters, and interactions |
| Chart.js | Financial data visualizations |
| Leaflet | Interactive GPS spending map |

## How the application works

```text
                 User's browser
                       |
                       v
           HTML / CSS / JavaScript
                       |
              Dashboard controls
              Filters and charts
                       |
                       v
               Google Apps Script
                       |
                       v
                  Google Sheets
                 (financial data)
                       |
                       v
            Processed dashboard data
                       |
                  +----+----+
                  |         |
                  v         v
              Chart.js    Leaflet
              charts      map
```

The user interface collects input and presents results, Google Apps Script handles application operations, and Google Sheets holds the underlying records. The public demo illustrates the user experience with fictional information and restricted editing capabilities.

## Dashboard components

### Financial summary

The overview brings together balances and financial activity to help users quickly understand their financial position.

### Income and expenses

Income and expenses can be organized into categories and reviewed using interactive visualizations. Income records support date-based filtering, including recent periods and a custom range.

### Transaction history

A searchable, filterable history makes it easier to inspect individual transactions. Pagination helps manage longer lists without displaying every record at once.

### Spending visualization

Charts communicate category breakdowns and trends; the map provides a geographical perspective on transactions with location information.

### Accounts, loans, and commitments

The application provides sections for reviewing multiple financial accounts, loans, and recurring obligations alongside day-to-day spending.

## Public demo and repository

- **Live read-only demo:** [Open the Personal Finance Dashboard](https://script.google.com/macros/s/AKfycbzQnDdzFDr9kobWvao3LqLxrWOZd0j8IlsHrxeS-Vaur5b0QEGDcsBNStDgAzg0Ku-g/exec)
- **GitHub:** [NeroReiki/personal-finance-dashboard-demo](https://github.com/NeroReiki/personal-finance-dashboard-demo)
- **Portfolio:** [Project details](https://my-universe-portfolio.vercel.app/projects/personal-finance-dashboard)

This repository represents the **public demonstration**. The original application used for personal finance tracking is separate.

## Exploring the project

1. Open the **Live Demo** link above.
2. Explore the overview, income, expense, account, and commitment sections available in the interface.
3. Use the date and transaction filters to examine the fictional records.
4. Interact with the charts and spending map.
5. Switch between light and dark mode to explore the interface options.

> **For developers:** The repository contains the public demo implementation. Consult its source files for deployment and configuration requirements; this README does not assume an exact spreadsheet schema, script deployment ID, or local development process that has not been independently verified.

## Privacy and security

- The public demo uses **fictional** financial information.
- The public demo is **read-only** to prevent changes to demonstration data.
- Avoid placing genuine account numbers, financial records, credentials, or personal locations into a public repository.
- If adapting the project for personal use, restrict access to the backing spreadsheet and any Apps Script deployment according to the intended audience.

## What I learned

This project provided hands-on experience with:

- Building a functional web application using Google Apps Script and Google Sheets.
- Connecting frontend interactions with spreadsheet-backed data.
- Designing dashboards that make financial information easier to interpret.
- Developing filters, history views, and interactive charts.
- Integrating a map visualization into a data-focused web interface.
- Improving usability through responsive layouts and theme switching.
- Preparing a separate, read-only demonstration for public sharing.

## Possible future improvements

- Additional export and reporting options.
- More automated data-quality checks.
- Further chart and mobile-interface refinements.
- Expanded documentation of the demo's architecture and data model.

---

**Project category:** Web Development · Automation · Data Visualization  
**Status:** Public read-only demo available  
**Built with:** Google Apps Script, Google Sheets, HTML, CSS, JavaScript, Chart.js, and Leaflet
