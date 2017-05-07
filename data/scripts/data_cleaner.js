/* global SpreadsheetApp, Logger */

/* eslint no-var: 0 */
/* eslint no-plusplus: 0 */
/* eslint vars-on-top: 0 */
/* eslint max-len: 0 */

// Google Script for cleaning <department name>-Output-Performance-Measures-2016-17_.xlsx data.
// Structure: 1 sheet for cleaned data, 1 sheet of raw data per spreadsheet file.
var consts = {
  DOC_URL: 'https://docs.google.com/spreadsheets/d/17fEmwzSN3XfnL8sPxGlHaN27xmIqGvUuVGdDDEbgkM8/edit#gid=0',
  CLEAN_DATA_SHEET: 'cleaned_data',
  TYPE_REGEXP: /^Quantity|Quality|Timeliness|Cost$/,
  FIN_YEARS: ['2017-18', '2016-17', '2015-16', '2014-15', '2013-14', '2012-13', '2011-12', '2010-11', '2009-10', '2008-09', '2007-08'],
  HEADERS: ['department_name', 'program_category', 'category_description', 'program_name', 'program_description', 'measure_type', 'deliverable', 'measure_unit', 'measure_target', 'estimate_or_actual', 'year'],
};

// Loops through data object to create array that will be written to clean_data sheet
function createDataArray (data) {
  var dataArray = [consts.HEADERS];
  var i;
  var department;
  var departmentName;
  var categoryNames;
  var j;
  var category;
  var categoryName;
  var categoryDescription;
  var programNames;
  var k;
  var program;
  var programName;
  var programDescription;
  var measureTypeNames;
  var l;
  var measureType;
  var measureTypeName;
  var deliverables;
  var m;
  var deliverableYears;
  var n;
  var deliverableYear;

  for (i = 0; i < data.length; i++) {
    department = data[i];
    departmentName = department.name;
    categoryNames = department.program_categories;

    for (j = 0; j < categoryNames.length; j++) {
      category = department[categoryNames[j]];
      categoryName = category.name;
      categoryDescription = category.description;
      programNames = category.program_names;

      for (k = 0; k < programNames.length; k++) {
        program = category[programNames[k]];
        programName = program.name;
        programDescription = program.description;
        measureTypeNames = program.measure_type_names;

        for (l = 0; l < measureTypeNames.length; l++) {
          measureType = program[measureTypeNames[l]];
          measureTypeName = measureType.name;
          deliverables = measureType.deliverables;

          for (m = 0; m < deliverables.length; m++) {
            deliverableYears = deliverables[m];

            for (n = 0; n < deliverableYears.length; n++) {
              deliverableYear = deliverableYears[n];

              dataArray[dataArray.length] = [departmentName, categoryName, categoryDescription, programName, programDescription, measureTypeName].concat(deliverableYear);
            }
          }
        }
      }
    }
  }

  return dataArray;
}

function writeCleanDataSheet (ss, data) {
  var cleanSheet = ss.getSheetByName(consts.CLEAN_DATA_SHEET) || ss.createSheet(consts.CLEAN_DATA_SHEET);
  var dataArray = createDataArray(data);
  var rowCount = dataArray.length;
  var colCount = consts.HEADERS.length;
  var cleanRange;

  cleanSheet.clear();
  cleanRange = cleanSheet.getRange(1, 1, rowCount, colCount);
  cleanRange.setValues(dataArray);
}

function getDeliverables (tableRow) {
  var deliverableName = tableRow[0];
  var measureUnit = tableRow[1];
  var finYears = consts.FIN_YEARS;
  var yearsLength = finYears.length;
  var deliverables = [];
  var j;
  var target;
  var actual;

  for (j = 0; j < yearsLength; j++) {
    // Each year has 2 columns: 1 for target & 1 for estimate/actual
    target = 2 + (j * 2) < tableRow.length ? tableRow[2 + (j * 2)] : '';
    actual = 3 + (j * 2) < tableRow.length ? tableRow[3 + (j * 2)] : '';

    deliverables[deliverables.length] = [
      deliverableName,
      measureUnit,
      target,
      actual,
      finYears[j],
    ];
  }

  return deliverables;
}

function isDeliverable (tableRow) {
  // Only deliverables have content in the cell to the right
  return /\w+/.test(tableRow[1]);
}

function isProgramLabel (i, tableArray) {
  var label;

  if (i + 2 < tableArray.length) {
    label = tableArray[(i + 2)][0];

    // If there's an empty cell, between a potential program label and 'Quantity' cell,
    // it's probably not actually a label
    if (label === '') { return false; }
    // 'Quantity' generally appears at the top of a new table
    if (label === 'Quantity') { return true; }
  }

  return false;
}

function isCategoryLabel (i, tableArray) {
  var j;
  var label;
  var sourceCheck;

  for (j = 3; j < 6; j++) {
    if (i + j < tableArray.length) {
      label = tableArray[(i + j)][0];

      // If there's an empty cell, between a potential category label and 'Quantity' cell,
      // it's probably not actually a label
      if (label === '') { return false; }
      // 'Quantity' generally appears at the top of a new table
      if (label === 'Quantity') {
        sourceCheck = i - 3 >= 0 ? tableArray[i - 3][0] : '';

        // Extra check in case a category/program doesn't have description
        if (j === 3 && /^Source:/.test(sourceCheck)) { return true; }
        if (j === 4) { return true; }
      }
    }
  }

  return false;
}

function getDepartment (tableArray) {
  var departmentName = tableArray[0][0];
  return { name: departmentName, program_categories: [] };
}

function organiseSheet (sheet) {
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var tableArray = sheet.getRange(1, 1, lastRow, lastColumn).getValues();
  var department = getDepartment(tableArray);
  var i;
  var tableRow;
  var rowLabel;
  var normalizedRowLabel;
  var categoryLabel;
  var categoryString;
  var splitIndex;
  var nextString;
  var categoryDescription;
  var categoriesLength = 0;
  var programCategories;
  var categoryIndex;
  var programLabel;
  var programName;
  var programDescription;
  var namesLength = 0;
  var programNames;
  var programIndex;
  var typeLabel;
  var typesLength;
  var deliverablesLength;

  for (i = 0; i < tableArray.length; i++) {
    tableRow = tableArray[i];
    rowLabel = tableRow[0];
    normalizedRowLabel = rowLabel.replace(/\s/g, '_').toLowerCase();

    // Obnoxiously massive RegExp to check for words/phrases that tend to appear
    // in non-relevant text due to inconsistency of label positioning
    if (rowLabel !== '' && !/total\soutput|expected\soutcome|^this\sperformance\smeasure|^(?:[tT]his|[tT]he)\sobjective|^(?:[tT]his|[tT]he)\soutput|201[67]-1[78]\starget|sources?:|note:/i.test(rowLabel)) {
      // If this row is a category label, add it to department object
      if (isCategoryLabel(i, tableArray)) {
        categoryLabel = normalizedRowLabel;

        if (!department[categoryLabel]) {
          // Some category labels have the description appended to the same string,
          // so they need to be split
          if (/\sthis\sobjective/i.test(rowLabel)) {
            splitIndex = rowLabel.indexOf(' This objective');
            categoryString = rowLabel.slice(0, splitIndex);
            categoryLabel = categoryString.replace(/\s/g, '_').toLowerCase();
            categoryDescription = rowLabel.slice(splitIndex + 1);
          } else {
            nextString = tableArray[(i + 1)][0];
            // Length check is to avoid adding program labels as category descriptions
            // for when there isn't a real description
            categoryDescription = (!consts.TYPE_REGEXP.test(nextString) && nextString.length > 100 && nextString) || '';
          }

          department[categoryLabel] = {
            name: rowLabel,
            description: categoryDescription,
            program_names: [],
          };
          categoriesLength = department.program_categories.length;
          department.program_categories[categoriesLength] = categoryLabel;

        // Just in case there's a duplicate category label: just moves the label to the end
        // of the array to make it the most recent
        } else {
          programCategories = department.program_categories;
          categoryIndex = programCategories.indexOf(categoryLabel);
          department.program_categories =
            programCategories
              .slice(0, categoryIndex)
              .concat(programCategories.slice(categoryIndex + 1), categoryLabel);
        }

      // If this row is program label, add it to most-recent category
      } else if (categoryLabel && isProgramLabel(i, tableArray)) {
        programLabel = normalizedRowLabel;

        if (!department[categoryLabel][programLabel]) {
          programName = programLabel;
          // Type check is to avoid adding measure types as descriptions to programs
          // that don't have one
          programDescription = consts.TYPE_REGEXP.test(tableArray[(i + 1)][0]) ? '' : tableArray[(i + 1)][0];
          department[categoryLabel][programName] = {
            name: rowLabel,
            description: programDescription,
            measure_type_names: [],
          };
          namesLength = department[categoryLabel].program_names.length;
          department[categoryLabel].program_names[namesLength] = programName;

        // Just in case there's a duplicate program label: just moves the label to the end
        // of the array to make it the most recent
        } else {
          programNames = categoryLabel.program_names;
          programIndex = programNames.indexOf(programLabel);
          department[categoryLabel].program_names =
            programNames
              .slice(0, programIndex)
              .concat(programNames.slice(programIndex + 1), programLabel);
        }

      // Add measurement type to most-recent program
      } else if (programLabel && consts.TYPE_REGEXP.test(rowLabel)) {
        typeLabel = normalizedRowLabel;
        department[categoryLabel][programLabel][typeLabel] = {
          name: rowLabel,
          deliverables: [],
        };
        typesLength = department[categoryLabel][programLabel].measure_type_names.length;
        department[categoryLabel][programLabel].measure_type_names[typesLength] = typeLabel;

      // Add deliverables to most-recent measure type
      } else if (typeLabel && isDeliverable(tableRow)) {
        deliverablesLength = department[categoryLabel][programLabel][typeLabel].deliverables.length;
        department[categoryLabel][programLabel][typeLabel].deliverables[deliverablesLength] = getDeliverables(tableRow);
      }
    }
  }

  return department;
}

// Filter out sheets that don't have raw budget table data
function getRawSheets (sheets) {
  var i;
  var sheet;
  var rawSheets = [];

  for (i = 0; i < sheets.length; i++) {
    sheet = sheets[i];

    if (!/dept/i.test(sheet.getName())) {
      rawSheets[rawSheets.length] = sheet;
    }
  }

  return rawSheets;
}

function organiseData (sheets) {
  var i;
  var rawSheets = getRawSheets(sheets);
  var cleanSheets = [];
  var sheet;

  for (i = 0; i < rawSheets.length; i++) {
    sheet = rawSheets[i];

    cleanSheets[cleanSheets.length] = organiseSheet(sheet);
  }

  return cleanSheets;
}

function main () {
  var url = consts.DOC_URL;
  var ss = SpreadsheetApp.openByUrl(url);
  var sheets = ss.getSheets();
  var organisedDataArray = organiseData(sheets);

  writeCleanDataSheet(ss, organisedDataArray);
}
