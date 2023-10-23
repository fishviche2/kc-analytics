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
} = require('./analytics');
const moveFileToFolder = require('./drive');
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
    if (response.status == 200){
      if (documents[i].status !== 'COMPLETED') {
        if(response.status == 'COMPLETED'){
          await updateDocument(documents[i].docId);
          let documentId = response.driveDownloadDetails.documentId
          moveFileToFolder(documentId, headers)
        }
      }
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});