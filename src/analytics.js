const axios = require('axios');
const getToken = require('./auth');


const createRequestConfig = (method, url, token, data) => {
  return {
    method,
    url,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    ...(data && { data }),
  };
}

const insertReport = async (token) => {
  const url = "https://www.googleapis.com/analytics/v3/management/accounts/164163844/webproperties/UA-164163844-10/profiles/231362837/unsampledReports";

  const data = {
    "end-date": "2023-07-31",
    "metrics": "ga:users",
    "start-date": "2023-07-01",
    "title": "test",
    "dimensions": "ga:date,ga:source",
    "filters": ""
  };

  try {
    const res = await axios(createRequestConfig('post', url, token, data));
    return res.data
  } catch (error) {
    throw new Error(`Error al insertar el informe: ${error.message}`);
  }

}

const getReports = async () => {
  try {
    const token = await getToken();
    const data = await insertReport(token);
    const url = data.selfLink;
    const res = await axios(createRequestConfig('get', url, token));
    console.log(res);
    console.log(token);
    return res.data
  } catch (error) {
    throw new Error(`Error al insertar el informe: ${error.message}`);
  }
}
getReports()
  .then((data) => {
    console.log('Informes obtenidos:', data);
  })
  .catch((error) => {
    console.error(error);
  });