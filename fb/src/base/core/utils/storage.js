import { getStorage, ref } from "firebase/storage"

import { firebase } from 'core/utils'

const storage = r => ref(getStorage(firebase), r);

export default storage;
