import firebase from 'firebase-admin'

const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_APP_CREDENTIALS, 'base64').toString());

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert(credentials),
    databaseURL: "https://projectid.firebaseio.com"
  });
}

export { firebase };
