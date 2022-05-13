import { cert, getApps, initializeApp } from 'firebase-admin/app'

const firebase = getApps().length === 1 ? getApps()[0] : initializeApp({
  credential: cert({
  }),
  databaseURL: 'https://projectid.firebaseio.com'
})

export { firebase };
