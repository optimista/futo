import { getFirestore } from 'firebase/firestore'

import { firebase } from 'core/fb'

const db = () => getFirestore(firebase);

export default db;
