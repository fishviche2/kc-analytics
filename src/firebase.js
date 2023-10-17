const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
require('dotenv').config();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const collectionRef = db.collection(process.env.FIREBASE_COLLECTION);


async function insertDocuments(data) {
  try {
    const batch = db.batch();
    data.forEach((documentData) => {
      const newDocumentRef = collectionRef.doc();
      batch.set(newDocumentRef, documentData);
    });
    await batch.commit();
    return 'Documentos insertados exitosamente';
  } catch (error) {
    throw new Error(`Error al insertar documentos: ${error.message}`);
  }
}

async function getDocuments() {
  try {
    const querySnapshot = await collectionRef.get();
    const documents = [];
    querySnapshot.forEach((document) => {
      documents.push(document.data());
    });
    return documents;
  } catch (error) {
    throw new Error(`Error al obtener documentos: ${error.message}`);
  }
}

// async function main() {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });

//   const db = admin.firestore();
//   const collectionRef = db.collection('jobs_queue_erick');
//   const dataToInsert = [{ foo: 'bar4' }, { foo: 'bar5' }];

//   try {
//     const insertResult = await insertDocuments(db, collectionRef, dataToInsert);
//     console.log(insertResult);
//     const documents = await getDocuments(collectionRef);
//     console.log(documents);
//   } catch (error) {
//     console.error(error);
//   }
// }

module.exports = {
  insertDocuments,
  getDocuments
}
