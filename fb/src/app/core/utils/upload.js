import { deleteObject, getDownloadURL, uploadString } from 'firebase/storage'

import { storage } from 'core/utils'

const upload = async (path, string) => new Promise((resolve, reject) => {
  const ref = storage(path), upload = uploadString(ref, string, "data_url");
  upload.then(({ ref }) => getDownloadURL(ref)).then(resolve).catch(err => { deleteObject(ref); reject(err); })
});

export default upload;
