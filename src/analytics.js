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
const generateURL = (webPropertyId, profileId) => {
  return `https://www.googleapis.com/analytics/v3/management/accounts/164163844/webproperties/${webPropertyId}/profiles/${profileId}/unsampledReports`
}
const insertReport = async (token, data) => {
  // const url = "https://www.googleapis.com/analytics/v3/management/accounts/164163844/webproperties/UA-164163844-10/profiles/231362837/unsampledReports";
  

  try {
    const temp_data = {
      "end-date": data['end-date'],
      "metrics": data['metrics'],
      "start-date": data['start-date'],
      "title": `${data['start-date']} ${data['end-date']}`,
      "dimensions": data['dimensions'],
      "filters": data['filters']
    };
    console.log(temp_data)
    let url = generateURL(data['property_id'], data['profile_id'])
    console.log(url)
    const res = await axios(createRequestConfig('post', url, token, temp_data));
    console.log('res', res);
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
// getReports()
//   .then((data) => {
//     console.log('Informes obtenidos:', data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
module.exports = insertReport;