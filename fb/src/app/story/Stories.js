import { empty, filter } from '@futo-ui/utils'

import { collection } from 'core/utils'
import { docWId, time, timestampToDate, wo, wTimestamp } from 'core/utils/converters'

const Stories = collection('stories').withConverter({
  fromFirestore: snapshot => (doc => ({ ...doc, editedAtTime: time(doc.editedAt) })).call(null, timestampToDate(docWId(snapshot), 'editedAt')), 
  toFirestore: doc => ({ 
    ...wTimestamp(wo(doc, ['id', 'editedAtTime']), 'editedAt'),
    nodes: filter(doc.nodes, (_, v) => !empty(v.content)),
    positions: filter(doc.positions, k => !empty(doc.nodes[k].content)),
  })
});

export default Stories;
