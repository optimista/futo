import { base64 } from '@futo-ui/utils'
import { deleteObject, getDownloadURL, uploadBytes, uploadString } from 'firebase/storage'

import { storage } from 'core/utils'

const upload = async (path, file) => new Promise((resolve, reject) => {
  const ref = storage(path), upload = base64(file) ? uploadString(ref, file, "data_url") : uploadBytes(ref, file);
  upload.then(({ ref }) => getDownloadURL(ref)).then(resolve).catch(err => { deleteObject(ref); reject(err); })
});

export default upload;
