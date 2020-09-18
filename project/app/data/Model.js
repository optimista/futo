import { firebase } from 'utils'

class Model {
  // Constructor
  constructor({ name, converter }) {
    this.options = { name, converter };
    this.config();
  }

  // Configuration for server/client SDK
  config(firebaseServer) {
    const { converter, name } = this.options;
    this.firestore = (firebaseServer || firebase).firestore;
    this.collection = this.firestore().collection(name);
    return this;
  }

  // Queries
  ordered() {
    const { converter } = this.options;
    return this.collection.withConverter(converter).orderBy("timestamp", "desc");
  }

  async obtain(collection) { return (await collection.get()).docs.map(doc => doc.data()); }
 
  all() {
    return this.obtain(this.ordered());
  }

  after(timestamp, n, { snapshot } = { snapshot: false }) {
    const after = this.ordered().startAfter(new this.firestore.Timestamp.fromMillis(timestamp)).limit(n);
    return snapshot ? after : this.obtain(after);
  }

  limit(n, { snapshot } = { snapshot: false }) {
    const limit = this.ordered().limit(n);
    return snapshot ? limit : this.obtain(limit);
  }

  // Snapshot
  onSnapshot(observer) {
    return this.ordered().where('timestamp', '>=', new Date()).onSnapshot(observer);
  }

  // Modify
  create(data) {
    return this.collection.add({ ...data, timestamp: this.firestore.FieldValue.serverTimestamp() });
  }

  delete(id) {
    return this.collection.doc(id).delete();
  }

  update(id, data) {
    return this.collection.doc(id).update(data);
  }
}

export default Model;
