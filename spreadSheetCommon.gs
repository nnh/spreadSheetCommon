/**
 * If the sheet name specified in the argument does not exist, a new sheet object is created.
 * @param {string} spreadSheetId The target spreadsheet id.
 * @param {string} sheetName The target sheet name.
 * @return {Object} none.
 */
function insertSheetBySheetName(spreadSheetId, sheetName){
  try{
    Sheets.Spreadsheets.get(spreadSheetId);
  } catch(error){
    console.log('The spreadsheet ID is incorrectly specified.');
    return;
  }
  const ss = Sheets.Spreadsheets.get(spreadSheetId);
  const sheetNameCheck = ss.sheets.map(sheet => sheet.properties.title === sheetName).some(x => x);
  if (!sheetNameCheck){
    const targetSs = SpreadsheetApp.openById(spreadSheetId);
    targetSs.insertSheet(); 
    targetSs.getActiveSheet().setName(sheetName);
    targetSs.moveActiveSheet(targetSs.getSheets().length);
  }
  return;
}
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