import { empty, filter } from '@futo-ui/utils'

import { firebase } from 'core/utils'
import { docWId, time, timestampToDate, woId, wServerTimestamp } from 'core/utils/converters'

const Stories = firebase.firestore().collection('stories').withConverter({
  fromFirestore: snapshot => (doc => ({ ...doc, editedAtTime: time(doc.editedAt) })).call(null, timestampToDate(docWId(snapshot), 'editedAt')), 
  toFirestore: doc => ({ 
    ...wServerTimestamp(woId(doc), 'editedAt'),
    nodes: filter(doc.nodes, (_, v) => !empty(v.content)),
    order: doc.order.filter(k => !empty(doc.nodes[k].content)),
    positions: filter(doc.positions, k => !empty(doc.nodes[k].content)),
  })
});

export default Stories;
