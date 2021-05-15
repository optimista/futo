import { docWithIdAndTimestamp, firebase, toFirestore } from 'utils'

const datetime = date => {
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date),
        month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date),
        day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

  return `${year} / ${month} / ${day}`;
}

const Profiles = firebase.firestore().collection('profiles').withConverter({
  fromFirestore: snapshot => {
    const doc = docWithIdAndTimestamp(snapshot);
    return { ...doc, time: datetime(doc.timestamp) }
  },
  toFirestore
});

export default Profiles;
