import { getFirestore } from 'firebase/firestore'

import { firebase } from 'core/utils'

const db = () => getFirestore(firebase);

export default db;
