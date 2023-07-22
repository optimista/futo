import { base64 } from '@futo-ui/utils'
import { deleteObject, getDownloadURL, uploadBytes, uploadString } from 'firebase/storage'

import { storage } from 'core/fb'

const upload = async (auth, path, file) => new Promise((resolve, reject) => {
  const ref = storage(path), metadata = { customMetadata: { profileId: auth.uid } }, upload = base64(file) ? uploadString(ref, file, "data_url", metadata) : uploadBytes(ref, file, metadata);
  upload.then(({ ref }) => getDownloadURL(ref)).then(resolve).catch(err => { deleteObject(ref); reject(err); })
});

export default upload;
