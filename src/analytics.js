const axios = require('axios');
const getToken = require('./auth');


const config = (method, url, token, data) => {
  return {
    method: method,
    url: url,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };
}

const reportsInsertAPI = async () => {
  const token = await getToken();
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
    const res = await axios(config('post', url, token, data));
    return res.data
  } catch (error) {
    console.error(error);
  }

}

const getReportsAPI = async () => {
  try {
    const token = await getToken();
    const url = await reportsInsertAPI;
    console.log(url);
    const res = await axios(config('get', url, token, {}));
    console.log(res);
    return res.data
  } catch (error) {
    console.error(error);
  }
}
getReportsAPI()