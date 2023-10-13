const axios = require('axios');

const GOOGLE_SHEETS_URL = 'https://sheets.googleapis.com/v4/spreadsheets/19WEbP0weeoSVmzYE6-qXpMYLramLSDUu3L5GPHD5h30?includeGridData=True';
const TARGET_SHEET_TITLE = 'COMPLETED';
const COLUMN_HEADERS = ['property_id', 'profile_id', 'metrics', 'dimensions', 'filters', 'start-date', 'end-date'];


const extractData = (rowData, columnHeaders) => {
  return rowData.map(row => {
    const dataRow = {};
    row.values.forEach((cell, index) => {
      const header = columnHeaders[index];
      if (cell.userEnteredValue && header) {
        dataRow[header] = cell.userEnteredValue.stringValue || cell.userEnteredValue.numberValue;
      }
    });
    return dataRow;
  });
};

const getDataFromSheets = async (headers) => {
  try {
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

// async function fetchGoogleSheetsData(headers) {
//   try {
//     const url = 'https://sheets.googleapis.com/v4/spreadsheets/19WEbP0weeoSVmzYE6-qXpMYLramLSDUu3L5GPHD5h30?includeGridData=True';
//     const response = await axios.get(url, { headers });
//     const sheets = response.data.sheets
//     // const sheets = excelData.sheets;
//     const data = manipulatingData(sheets);
//     return data.slice(1);
//   } catch (error) {
//     throw new Error(`Error al insertar el informe: ${error.message}`);
//   }
// };
module.exports = fetchGoogleSheetsData;