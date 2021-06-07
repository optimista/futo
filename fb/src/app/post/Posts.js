import { firebase } from 'core/utils'
import { docWId, time, timestampToDate, wServerTimestamp } from 'core/utils/converters'

const Posts = firebase.firestore().collection('posts').withConverter({
  fromFirestore: snapshot => (doc => ({ ...doc, time: time(doc.timestamp) })).call(null, timestampToDate(docWId(snapshot))), 
  toFirestore: doc => wServerTimestamp(doc)
});

export default Posts;
