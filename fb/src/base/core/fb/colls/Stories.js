import { empty, filter } from '@futo-ui/utils'

import { collection } from 'core/fb'
import { docWId, time, timestamp, timestampToDate, wo } from 'core/fb/converters'

const ignoreNode = n => n === undefined || empty(n.content);

const Stories = collection('stories').withConverter({
  fromFirestore: snapshot => (doc => ({ ...doc, editedAt: timestamp(doc.editedAt), editedAtTime: time(doc.editedAt) })).call(null, timestampToDate(docWId(snapshot), 'editedAt')), 
  toFirestore: doc => ({ 
    ...wo(doc, ['id', 'editedAtTime']),
    ...(doc.nodes ? { nodes: filter(doc.nodes, (_, n) => !ignoreNode(n)) } : {}),
    ...(doc.positions ? { positions: filter(doc.positions, k => !ignoreNode(doc.nodes[k])) } : {}),
  })
});

export default Stories;
