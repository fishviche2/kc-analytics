const axios = require('axios');
const getToken = require('./auth');


const createRequestConfig = (method, url, headers, data) => {
  return {
    method,
    url,
    headers,
    ...(data && { data }),
  };
}
const generateURL = (webPropertyId, profileId) => {
  return `https://www.googleapis.com/analytics/v3/management/accounts/164163844/webproperties/${webPropertyId}/profiles/${profileId}/unsampledReports`
}
const insertReport = async (headers, data) => {
  // try {
    const temp_data = {
      "end-date": data['end-date'],
      "metrics": data['metrics'],
      "start-date": data['start-date'],
      "title": `${data['start-date']} ${data['end-date']}`,
      "dimensions": data['dimensions'],
      "filters": data['filters']
    };
    let url = generateURL(data['property_id'], data['profile_id'])
    const res = await axios(createRequestConfig('post', url, headers, temp_data));
    return res.data
  // } catch (error) {
  //   throw new Error(`Error al insertar el informe: ${error.message}`);
  // }

}

const getReports = async (headers, data) => {
  try {
    const url = data.selfLink;
    const res = await axios(createRequestConfig('get', url, headers));
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
module.exports = {
  insertReport,
  getReports
};