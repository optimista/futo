import { firebase } from 'utils'

const toFirestore = doc => ({
  ...doc,
  timestamp: firebase.firestore.FieldValue.serverTimestamp()
});

export default toFirestore;
