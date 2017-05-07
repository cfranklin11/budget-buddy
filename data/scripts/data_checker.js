/* global SpreadsheetApp, Logger, getRawSheets */

/* eslint no-var: 0 */
/* eslint no-plusplus: 0 */
/* eslint vars-on-top: 0 */
/* eslint max-len: 0 */
/* eslint prefer-spread: 0 */

// This is to collect all the category/program names (based on font size) to check against cleaned data.
// This runs up against Google Scripts' time limit, so you can only run 2 - 4 sheets at a time.
var consts = { DOC_URL: 'https://docs.google.com/spreadsheets/d/17fEmwzSN3XfnL8sPxGlHaN27xmIqGvUuVGdDDEbgkM8/edit#gid=0' };

function getTitles (sheet) {
  var lastRow = sheet.getLastRow();
  var tableRange = sheet.getRange(1, 1, lastRow);
  var titleArray = [];
  var i;
  var cell;
  var cellString;

  for (i = 2; i < lastRow + 1; i++) {
    cell = tableRange.getCell(i, 1);

    if (cell.getFontSize() >= 14) {
      cellString = cell.getValue();

      // There are some sections that have a summary that uses the title:
      // Victorians are..., but this isn't a category/program label
      if (!/victorians\sare/i.test(cellString)) {
        titleArray[titleArray.length] = [cellString];
      }
    }
  }

  return titleArray;
}

function getAllTitles (sheets) {
  var i;
  var rawSheets = getRawSheets(sheets);
  var allTitles = [];
  var sheet;

  for (i = 5; i < 8; i++) {
    sheet = rawSheets[i];

    allTitles = allTitles.concat(getTitles(sheet));
  }

  return allTitles;
}

function dataChecker () {
  var url = consts.DOC_URL;
  var ss = SpreadsheetApp.openByUrl(url);
  var sheets = ss.getSheets();
  var titleArray = getAllTitles(sheets);
  var rowCount = titleArray.length;
  var sheet = ss.getSheetByName('data_check') || ss.insertSheet('data_check');
  var lastRow = sheet.getLastRow();
  var sheetRange;

  sheetRange = sheet.getRange(lastRow + 1, 1, rowCount, 1);
  sheetRange.setValues(titleArray);
}
