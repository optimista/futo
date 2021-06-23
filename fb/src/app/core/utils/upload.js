import { storage } from 'core/utils'

const upload = async (path, string) => new Promise((resolve, reject) => {
  const ref = storage(path), upload = ref.putString(string, "data_url");

  upload.on("state_changed",
    () => {}, // TODO: snapshot => console.log(snapshot.bytesTransferred / snapshot.totalBytes),
    reject, // TODO: handle err => {}
    () => upload.snapshot.ref.getDownloadURL().then(resolve).catch(err => { ref.delete(); reject(err); })
  );
});

export default upload;
