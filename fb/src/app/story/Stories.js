import { empty, filter } from '@futo-ui/utils'

import { collection } from 'core/utils'
import { docWId, time, timestamp, timestampToDate, wo, wTimestamp } from 'core/utils/converters'

const Stories = collection('stories').withConverter({
  fromFirestore: snapshot => (doc => ({ ...doc, editedAt: timestamp(doc.editedAt), editedAtTime: time(doc.editedAt) })).call(null, timestampToDate(docWId(snapshot), 'editedAt')), 
  toFirestore: doc => ({ 
    ...wTimestamp(wo(doc, ['id', 'editedAtTime']), 'editedAt'),
    ...(doc.nodes ? { nodes: filter(doc.nodes, (_, v) => !empty(v.content)) } : {}),
    ...(doc.positions ? { positions: filter(doc.positions, k => !empty(doc.nodes[k].content)) } : {}),
  })
});

export default Stories;
