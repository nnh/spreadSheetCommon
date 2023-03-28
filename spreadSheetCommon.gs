/**
 * Create a new spreadsheet.
 * @param {string} title Spreadsheet name.
 * @return {Object} Spreadsheet object.
 */
function createNewSpreadSheet(title=null){
  const newSheet = Sheets.newSpreadsheet();
  if (title !== null){
    newSheet.properties = Sheets.newSpreadsheetProperties();
    newSheet.properties.title = title;
  }
  const ss = Sheets.Spreadsheets.create(newSheet);
  return ss;
}
/**
 * Copy a sheet from an existing spreadsheet.
 * @param {string} fromSs The spreadsheet id from which the copy was made.
 * @param {Object} toSs The spreadsheet object to copy to.
 * @param {number} sheetId ID of the sheet to be copied.
 * @return {Object} Newly created sheet object..
 */
function copySheet(fromSs, toSs, fromSheetId){
  const sheet = Sheets.Spreadsheets.Sheets.copyTo(
    {
      destinationSpreadsheetId: toSs.spreadsheetId
    },
    fromSs,
    fromSheetId    
  );
  return sheet;
}
function getSheetIdMap(ss){
  return new Map(ss.sheets.map(x => [x.properties.title, x.properties.sheetId]));
}