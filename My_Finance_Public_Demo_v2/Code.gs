/**
 * MY FINANCE — PUBLIC PORTFOLIO DEMO
 * Read-only web app. Uses ONLY a spreadsheet created by adminSetupDemo_().
 * IMPORTANT: Create a brand-new STANDALONE Apps Script project for this code.
 * No public server-side editing functions are defined.
 */

const DEMO_PROPERTY_KEY_ = 'MY_FINANCE_DEMO_SPREADSHEET_ID';
const DEMO_TIME_ZONE_ = 'Asia/Kuala_Lumpur';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('My Finance — Public Demo (Sample Data)')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

// #region PRIVATE ADMIN SETUP
/**
 * Run ONCE from the Apps Script editor's Run menu, as the OWNER.
 * Creates an entirely NEW spreadsheet with invented/sample data.
 * Name ends with _ so website visitors cannot call it using google.script.run.
 * Re-running returns the existing spreadsheet, WITHOUT deleting any data.
 */
function adminSetupDemo_() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty(DEMO_PROPERTY_KEY_);
  if (existingId) {
    const existing = SpreadsheetApp.openById(existingId);
    Logger.log('Existing demo spreadsheet (no changes made): ' + existing.getUrl());
    return existing.getUrl();
  }

  const ss = SpreadsheetApp.create('My Finance Dashboard - PUBLIC DEMO - SAMPLE DATA');
  ss.setSpreadsheetTimeZone(DEMO_TIME_ZONE_);

  const accountsSheet = ss.getSheets()[0];
  accountsSheet.setName('Accounts');
  const categoriesSheet = ss.insertSheet('Categories');
  const transactionsSheet = ss.insertSheet('Transactions');
  const commitmentsSheet = ss.insertSheet('Commitments');
  const loansSheet = ss.insertSheet('Loans');
  const sideIncomeSheet = ss.insertSheet('SideIncome');

  const accounts = [
    ['Demo Checking', 3600, 'Fictional checking account'],
    ['Demo Savings', 8500, 'Fictional savings account'],
    ['Demo eWallet', 320, 'Fictional digital wallet']
  ];
  const categories = [
    'Food', 'Groceries', 'Petrol', 'Transport', 'Bill', 'Utilities',
    'Rent', 'Shopping', 'Entertainment', 'Healthcare', 'Savings',
    'Salary', 'Freelance Side Income', 'GrabFood Side Income',
    'ShopeeFood Side Income', 'Loan Payment', 'Self-Transfer'
  ];
  const txRows = [];
  const sideRows = [];
  const totals = { 'Demo Checking': 3600, 'Demo Savings': 8500, 'Demo eWallet': 320 };
  const now = new Date();
  const startMonth = new Date(now.getFullYear(), now.getMonth() - 3, 1, 12, 0, 0);
  const monthCount = 4;

  // Fixed-seed random generator; all values are fictional.
  let seed = 20261113;
  function random_() {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 4294967296;
  }
  function money_(low, high) {
    return Math.round((low + random_() * (high - low)) * 100) / 100;
  }
  function date_(year, month, day) {
    return new Date(year, month, day, 12, 0, 0);
  }
  function add_(date, type, amount, category, account, notes, location, coordinates) {
    if (date.getTime() > now.getTime()) return;
    const cleanAmount = Math.round(amount * 100) / 100;
    txRows.push([date, type, cleanAmount, category, account, notes || '', location || '', coordinates || '']);
    totals[account] = Math.round((totals[account] + (type === 'Income' ? cleanAmount : -cleanAmount)) * 100) / 100;
  }

  const locations = [
    ['KLCC (sample)', '3.1579,101.7123'],
    ['Mid Valley (sample)', '3.1179,101.6774'],
    ['Bukit Bintang (sample)', '3.1466,101.7100'],
    ['Central Market (sample)', '3.1456,101.6958'],
    ['KL Sentral (sample)', '3.1342,101.6861']
  ];
  const expenseKinds = [
    ['Food', 12, 43, 'Lunch or dinner (sample)'],
    ['Groceries', 25, 125, 'Weekly groceries (sample)'],
    ['Transport', 5, 28, 'Transit (sample)'],
    ['Petrol', 35, 95, 'Fuel (sample)'],
    ['Shopping', 20, 135, 'General shopping (sample)'],
    ['Entertainment', 15, 65, 'Leisure (sample)']
  ];

  for (let m = 0; m < monthCount; m++) {
    const monthDate = new Date(startMonth.getFullYear(), startMonth.getMonth() + m, 1);
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const monthLength = new Date(year, month + 1, 0).getDate();

    add_(date_(year, month, 1), 'Income', 5200, 'Salary', 'Demo Checking', 'Sample monthly salary');
    add_(date_(year, month, 3), 'Expense', 1050, 'Rent', 'Demo Checking', 'Sample rent payment');
    add_(date_(year, month, 5), 'Expense', 125, 'Utilities', 'Demo Checking', 'Sample utility bill');
    add_(date_(year, month, 7), 'Expense', 98, 'Bill', 'Demo Checking', 'Sample mobile/internet bill');

    for (let day = 2; day <= monthLength; day += 2) {
      const kind = expenseKinds[Math.floor(random_() * expenseKinds.length)];
      const loc = locations[Math.floor(random_() * locations.length)];
      const account = random_() < 0.42 ? 'Demo eWallet' : 'Demo Checking';
      add_(date_(year, month, day), 'Expense', money_(kind[1], kind[2]), kind[0], account, kind[3], loc[0], loc[1]);
    }

    const sides = [
      [10, 'Freelance', 270, 'Demo Checking'],
      [20, 'GrabFood', 145, 'Demo eWallet'],
      [25, 'ShopeeFood', 85, 'Demo eWallet']
    ];
    sides.forEach(function(s) {
      const d = date_(year, month, s[0]);
      if (d.getTime() > now.getTime()) return;
      sideRows.push([d, s[1], s[2], s[3]]);
      add_(d, 'Income', s[2], s[1] + ' Side Income', s[3], 'Logged from Side Income tab');
    });
  }

  txRows.sort(function(a, b) { return a[0].getTime() - b[0].getTime(); });
  sideRows.sort(function(a, b) { return a[0].getTime() - b[0].getTime(); });
  accounts.forEach(function(a) { a[1] = totals[a[0]]; });

  writeDemoSheet_(accountsSheet, ['Account Name', 'Current Balance', 'Notes'], accounts);
  writeDemoSheet_(categoriesSheet, ['Category Name'], categories.map(function(c) { return [c]; }));
  writeDemoSheet_(transactionsSheet, ['Date', 'Type', 'Amount', 'Category', 'Account', 'Notes', 'Location', 'Coordinates'], txRows);
  writeDemoSheet_(commitmentsSheet, ['Item Name', 'Amount', 'Due Date', 'Category', 'Status', 'Type'], [
    ['Internet subscription', 98, '7th', 'Bill', 'Pending', 'Monthly'],
    ['Fitness membership', 65, '15th', 'Bill', 'Paid', 'Monthly'],
    ['Vehicle insurance', 350, '28th', 'Bill', 'Pending', 'Additional']
  ]);
  writeDemoSheet_(loansSheet, ['Loan Name', 'Total Amount', 'Monthly Installment', 'Months Left', 'Notes'], [
    ['Demo Education Loan', 4200, 200, 21, 'Fictional example'],
    ['Demo Vehicle Loan', 7800, 390, 20, 'Fictional example']
  ]);
  writeDemoSheet_(sideIncomeSheet, ['Date', 'Platform', 'Amount', 'Target Account'], sideRows);

  transactionsSheet.getRange(2, 1, txRows.length, 1).setNumberFormat('dd mmm yyyy');
  transactionsSheet.getRange(2, 3, txRows.length, 1).setNumberFormat('"RM" #,##0.00');
  sideIncomeSheet.getRange(2, 1, sideRows.length, 1).setNumberFormat('dd mmm yyyy');
  accountsSheet.getRange(2, 2, accounts.length, 1).setNumberFormat('"RM" #,##0.00');

  // Only store this isolated demo spreadsheet ID AFTER the setup succeeds.
  props.setProperty(DEMO_PROPERTY_KEY_, ss.getId());
  Logger.log('PUBLIC DEMO CREATED: ' + ss.getUrl());
  Logger.log('Sample transactions: ' + txRows.length);
  return ss.getUrl();
}

function writeDemoSheet_(sheet, headers, rows) {
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#14263f').setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  if (rows.length) sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  sheet.autoResizeColumns(1, headers.length);
}

// #endregion

// #region PRIVATE DEMO DATA ACCESS
function demoSpreadsheet_() {
  const id = PropertiesService.getScriptProperties().getProperty(DEMO_PROPERTY_KEY_);
  if (!id) throw new Error('Demo not initialized. The owner must run adminSetupDemo_() in the Apps Script editor first.');
  return SpreadsheetApp.openById(id);
}
function sheetValues_(name) {
  const sheet = demoSpreadsheet_().getSheetByName(name);
  if (!sheet) throw new Error('Missing demo sheet: ' + name);
  return sheet.getDataRange().getValues();
}
function dateKey_(value, ss) {
  const date = value instanceof Date ? value : new Date(value);
  return isNaN(date.getTime()) ? '' : Utilities.formatDate(date, ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd');
}
function dateDisplay_(value, ss) {
  const date = value instanceof Date ? value : new Date(value);
  return isNaN(date.getTime()) ? 'No Date' : Utilities.formatDate(date, ss.getSpreadsheetTimeZone(), 'dd MMM yyyy');
}
// #endregion

// #region PUBLIC READ-ONLY SERVER FUNCTIONS
// These are the ONLY callable data functions. No public function creates, changes or deletes data.
function getAccountData() {
  return sheetValues_('Accounts').slice(1).filter(function(r) { return r[0]; }).map(function(r) {
    return { name: String(r[0]), balance: Number(r[1]) || 0, notes: String(r[2] || '') };
  });
}
function getCategoryData() {
  return sheetValues_('Categories').slice(1).filter(function(r) { return r[0]; }).map(function(r) { return String(r[0]); });
}
function getTransactionData() {
  const ss = demoSpreadsheet_();
  return sheetValues_('Transactions').slice(1).filter(function(r) { return r[0]; }).map(function(r, i) {
    const dateKey = dateKey_(r[0], ss);
    return {
      row: i + 2, date: dateDisplay_(r[0], ss), dateKey: dateKey,
      isoDate: dateKey ? dateKey + 'T12:00:00.000Z' : '',
      type: String(r[1] || 'Expense'), amount: Number(r[2]) || 0,
      category: String(r[3] || 'General'), account: String(r[4] || ''),
      notes: String(r[5] || ''), location: String(r[6] || ''), coords: String(r[7] || '')
    };
  });
}
function getCommitmentData() {
  return sheetValues_('Commitments').slice(1).filter(function(r) { return r[0]; }).map(function(r, i) {
    return { row: i + 2, name: String(r[0]), amount: Number(r[1]) || 0,
      dueDate: String(r[2] || ''), category: String(r[3] || ''),
      status: String(r[4] || 'Pending'), type: String(r[5] || 'Monthly') };
  });
}
function getLoanData() {
  return sheetValues_('Loans').slice(1).filter(function(r) { return r[0]; }).map(function(r, i) {
    return { row: i + 2, name: String(r[0]), totalAmount: Number(r[1]) || 0,
      monthly: Number(r[2]) || 0, monthsLeft: Number(r[3]) || 0,
      notes: String(r[4] || '') };
  });
}
function getSideIncomeData() {
  const ss = demoSpreadsheet_();
  const records = sheetValues_('SideIncome').slice(1).filter(function(r) { return r[0]; }).map(function(r, i) {
    return { row: i + 2, date: dateDisplay_(r[0], ss), dateKey: dateKey_(r[0], ss),
      platform: String(r[1] || 'Other'), amount: Number(r[2]) || 0,
      account: String(r[3] || '') };
  });
  return { records: records, total: records.reduce(function(s, r) { return s + r.amount; }, 0) };
}
// #endregion
