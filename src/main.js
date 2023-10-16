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
    // const resulsts = await Promise.all(
    //   arrayParams.map(async (el) => {
    //     try {
    //       const response = await insertReport(token, el);
    //       console.log(response);
    //       return response
    //     } catch (error) {
    //       // Maneja errores aquí si es necesario
    //       console.error(`Error al insertar el informe: ${error.message}`);
    //     }
    //   })
    // )
    for (const el of arrayParams) {
      try {
        const response = await insertReport(token, el);
        console.log(response);
      } catch (error) {
        // Maneja errores aquí si es necesario
        console.error(`Error al insertar el informe: ${error.message}`);
      }
    }

  } catch (error) {
    throw new Error(`Error al insertar el informe: ${error.message}`);
  }
}

main()