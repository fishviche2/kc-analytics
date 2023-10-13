const getToken = require('./auth');
const fetchGoogleSheetsData = require('./readExcel');

async function main() {
  try {
    const token = await getToken();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    const response = await fetchGoogleSheetsData(headers);
    console.log('response: ', response);
    
  } catch (error) {
    throw new Error(`Error al insertar el informe: ${error.message}`);
  }
}

main()