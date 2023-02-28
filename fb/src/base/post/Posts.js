import { collection } from 'core/utils'
import { docWId, time, timestampToDate, wTimestamp } from 'core/utils/converters'

const Posts = collection('posts').withConverter({
  fromFirestore: snapshot => (doc => ({ ...doc, time: time(doc.timestamp) })).call(null, timestampToDate(docWId(snapshot))), 
  toFirestore: doc => wTimestamp(doc)
});

export default Posts;
