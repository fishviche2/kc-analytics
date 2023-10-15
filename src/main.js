const getToken = require('./auth');
const fetchGoogleSheetsData = require('./readExcel');
const insertReport = require('./analytics')

async function main() {
  try {
    const token = await getToken();
    console.log(token)
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    const arrayParams = await fetchGoogleSheetsData(headers);
    arrayParams.forEach(async (el) => {
      let response = await insertReport(token, el);
      // console.log(response);S
    });
    // console.log('response: ', arrayParams);
    
  } catch (error) {
    throw new Error(`Error al insertar el informe: ${error.message}`);
  }
}

main()