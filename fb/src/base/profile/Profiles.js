import { collection } from 'core/utils'
import { datetime, docWId, timestampToDate, wTimestamp } from 'core/utils/converters'

const Profiles = collection('profiles').withConverter({
  fromFirestore: snapshot => (doc => ({ ...doc, ...(doc.initiallyChangedAt ? { initiallyChangedAt: doc.initiallyChangedAt.toMillis() } : {}), time: datetime(doc.timestamp) })).call(null, timestampToDate(docWId(snapshot))),
  toFirestore: doc => wTimestamp(doc)
});

export default Profiles;
