import { collection } from 'firebase/firestore'

import { db } from 'core/fb'

const c = path => collection(db(), path);

export default c;
