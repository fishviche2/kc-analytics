const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

let jobsQueueRef = db.collection('jobs_queue');

jobsQueueRef.get().then((querySnapshot) => {
  querySnapshot.forEach(document => console.log(document))
})