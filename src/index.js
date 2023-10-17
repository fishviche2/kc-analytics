const express = require('express');
const fetchGoogleSheetsData = require('./readExcel');
const getHeaders = require('./auth');
const {
  insertDocuments,
  getDocuments,
  updateDocument
} = require('./firebase');
const {
  insertReport,
  getReports
} = require('./analytics')
// Settings
const app = express();
const port = 3000;
require('dotenv').config();

app.get('/get-reports', async (req, res) => {
  let headers = await getHeaders();
  console.log(headers);
  let documents = await getDocuments();
  for (let i = 0; i < documents.length; i++) {
    let response = await getReports(headers, documents[i]);
    if (documents[i].status !== 'COMPLETED') {
      await updateDocument(documents[i].docId);
      let documentId = response.driveDownloadDetails.documentId
    }
  }
  res.send('get-reports')
})

app.post('/generate-reports', async (req, res) => {
  let headers = await getHeaders();
  const data = await fetchGoogleSheetsData(headers);
  let documents = []
  for (let i = 0; i < data.length; i++) {
    documents.push(await insertReport(headers, data[i]));
  }
  res.send(await insertDocuments(documents));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})