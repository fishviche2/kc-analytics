const axios = require('axios');
const TARGET_SHEET_TITLE = 'COMPLETED';
const COLUMN_HEADERS = ['property_id', 'profile_id', 'metrics', 'dimensions', 'filters', 'start-date', 'end-date'];


const extractData = (rowData, columnHeaders) => {
  return rowData.map(row => {
    const dataRow = {};
    row.values.forEach((cell, index) => {
      const header = columnHeaders[index];
      if (cell.userEnteredValue && header) {
        dataRow[header] = cell.userEnteredValue.stringValue || cell.userEnteredValue.numberValue || '';
      }
    });
    return dataRow;
  });
};

const getDataFromSheets = async (headers) => {
  try {
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;
    const response = await axios.get(GOOGLE_SHEETS_URL, { headers });
    return response.data.sheets;
  } catch (error) {
    throw new Error(`Error al obtener datos de Google Sheets: ${error.message}`);
  }
};

const processData = (data) => {
  const completedData = data.find(sheet => sheet.properties.title === TARGET_SHEET_TITLE);
  if (!completedData) {
    return null;
  }
  const rowData = completedData.data[0].rowData;
  return extractData(rowData, COLUMN_HEADERS);
};

const fetchGoogleSheetsData = async (headers) => {
  const sheetsData = await getDataFromSheets(headers);
  const processedData = processData(sheetsData);
  if (processedData) {
    return processedData.slice(1);
  }
  return null;
};

module.exports = fetchGoogleSheetsData;