import { time } from '@futo-ui/utils'

import { docWithIdAndTimestamp, firebase, toFirestore } from 'utils'

const Posts = firebase.firestore().collection('posts').withConverter({
  fromFirestore: snapshot => {
    const doc = docWithIdAndTimestamp(snapshot);
    return { ...doc, time: time(doc.timestamp) }
  },
  toFirestore
});

export default Posts;
