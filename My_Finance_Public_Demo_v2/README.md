# My Finance Dashboard — PUBLIC DEMO (read-only)

A sanitized, independent version of the existing Google Sheets + Apps Script dashboard.
The UI retains your pie/line/bar charts, interactive chart expansion, sample GPS spending map,
transaction history/search, commitments, loans, side-income filtering/pagination, and dark/light toggle.

## SECURITY DESIGN
- Create a **new STANDALONE Apps Script project**, never paste this over your personal finance project.
- Run the private `adminSetupDemo_` function once from the **Apps Script editor**. It creates an entirely new spreadsheet and populates it with fictional Malaysian RM transactions, accounts, loans, commitments, income and non-sensitive location examples.
- The spreadsheet ID is stored in **Script Properties**, not hardcoded or exposed to visitors.
- All six data endpoints are READ-ONLY. There are NO public editing, deleting, resetting, GPS acquisition, or sheet creation server functions.
- The setup function ends with `_`; Apps Script prevents `google.script.run` from invoking private functions.
- Do **not** share the new spreadsheet itself with website visitors. Share only the web app `/exec` URL.
- Avoid publishing an existing Apps Script project with old deployed versions or original data access.

## INSTALL (beginner-friendly)
1. Open https://script.google.com/ and choose **New project** (standalone; not from your private sheet).
2. Rename to `My Finance Dashboard - PUBLIC DEMO`.
3. Open `Code.gs` and replace its contents with this package's `Code.gs`.
4. Add a new **HTML** file, name it **Index** (Apps Script displays it as Index.html). Replace its contents with this package's `Index.html`.
5. Save both files.
6. In the function dropdown at the top of the Apps Script editor, select `adminSetupDemo_`, click **Run**, and approve the required permissions. If the editor doesn't show underscore-suffixed functions in the dropdown, temporarily add and run a one-time `function initializeDemo() { return adminSetupDemo_(); }` in the editor, then REMOVE `initializeDemo` and save BEFORE making any public deployment.
7. Open **Execution log**. Copy the new spreadsheet URL if you wish to inspect it. Keep the sheet private.
8. Run `getAccountData` or `getTransactionData` from the editor to verify the sample data loads.
9. Deploy → **New deployment** → type **Web app**. Choose **Execute as: Me** and **Who has access: Anyone** only if the access option is available and the separate demo code/sheet have been verified. Google may require authentication depending on account settings.
10. Open the final `/exec` URL in an incognito window, check all tabs and charts, and verify you cannot add/edit/delete data. Do not use `/dev` for visitors.
11. Add the tested `/exec` URL to the portfolio project details page as a **Live Demo** link.

## NOTES
- Demo shows **sample data only**. All Google Sheets balances, loan amounts, location markers, and income are fictional.
- Demo is read-only by design. Visitors can still interact with filters, map and charts.
- Browser use of external libraries (Chart.js, Leaflet, Google Fonts) requires internet access.
- You can manually view the private sheet, but do not share it with public visitors.
- Apps Script still has execution quotas and service availability limits. This is a portfolio demo, not a high-scale production service.
- Re-running `adminSetupDemo_` reuses the existing demo spreadsheet; it does not overwrite records.
- If you change the code after deploying, update the existing deployment to a new version via Deploy → Manage deployments → Edit.

## Files
- `Code.gs`: new demo-only read-only backend and one-time data setup.
- `Index.html`: public read-only interface adapted from the original app.


## V2 — Five-tab and chart reliability update

- The Expense tab has been restored as a disabled, read-only form preview. There are five tabs again.
- A Chart.js fallback loader tries jsDelivr if the original unpkg CDN is unavailable.
- The page shows a specific error message rather than indefinite loading if chart dependencies or rendering fail.
- To update an existing deployment: paste the NEW Index.html into your Apps Script `Index.html`, save, then choose **Deploy → Manage deployments → Edit → New version → Deploy**. You do not have to regenerate your dummy spreadsheet.
- Only the standalone demo project should be changed. Do not replace your private finance app's files.
