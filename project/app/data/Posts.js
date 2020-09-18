import { time } from '@futo-ui/utils'

import { Model } from 'data'
import { firebase } from 'utils'

const Posts = new Model({
  name: 'posts',
  converter: {
    fromFirestore: snapshot => {
      const { id } = snapshot, 
            { content, timestamp } = snapshot.data(),
            millis = timestamp ? timestamp.toMillis() : Date.now(),
            t = time(millis);

      return { id, content, time: t, timestamp: millis }
    }
  }
})

export default Posts;
