const admin = require('firebase-admin')
const serviceAccount = require('./firebase.json')

require('dotenv').config()

const fcmToken = process.env.FCM_TOKEN
const firebaseUrl = process.env.FIREBASE_URL

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: firebaseUrl
});

const message = {
  token: fcmToken,
	notification: {
		title: "Hello",
		body: "Hello world - body message!"
	},
	data: {
		extra: "extra value",
		referenceId: "doHgVtDKXpsf78hsY"
	},
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
		process.exit(0)
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
