import { collection } from 'firebase/firestore'

import { db } from 'core/utils'

const c = path => collection(db(), path);

export default c;
