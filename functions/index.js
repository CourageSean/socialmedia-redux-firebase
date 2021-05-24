const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello World!');
});

exports.getShouts = functions.https.onRequest((req, res) => {
  admin
    .firestore()
    .collection('shouts')
    .get()
    .then((data) => {
      console.log(data);
      let shouts = [];
      data.forEach((doc) => {
        shouts.push(doc.data());
      });
      return res.json(shouts);
    })
    .catch((err) => console.error(err));
});
