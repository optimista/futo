import { time } from '@futo-ui/utils'

import { docWithIdAndTimestamp, firebase } from 'utils'

const Posts = firebase.firestore().collection('posts').withConverter({
  fromFirestore: snapshot => {
    const doc = docWithIdAndTimestamp(snapshot);
    return { ...doc, time: time(doc.timestamp) }
  },
  toFirestore: doc => ({
    ...doc,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
});

export default Posts;
