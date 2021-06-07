import { firebase } from 'core/utils'
import { datetime, docWId, timestampToDate, wServerTimestamp } from 'core/utils/converters'

const Profiles = firebase.firestore().collection('profiles').withConverter({
  fromFirestore: snapshot => (doc => ({ ...doc, time: datetime(doc.timestamp) })).call(null, timestampToDate(docWId(snapshot))),
  toFirestore: doc => wServerTimestamp(doc)
});

export default Profiles;
