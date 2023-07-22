import { getStorage, ref } from "firebase/storage"

import { firebase } from 'core/fb'

const storage = r => ref(getStorage(firebase), r);

export default storage;
