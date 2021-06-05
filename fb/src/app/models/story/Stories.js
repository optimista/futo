import { empty, filter } from '@futo-ui/utils'

import { firebase } from 'utils'

const Stories = firebase.firestore().collection('stories').withConverter({
  fromFirestore: doc => {
    const data = doc.data(), { editedAt } = data;
    return { ...data, id: doc.id, editedAt: editedAt ? editedAt.toDate() : new Date() };
  },
  toFirestore: ({ id, ...doc }) => ({ 
    ...doc,
    nodes: filter(doc.nodes, (_, v) => !empty(v.content)),
    order: doc.order.filter(k => !empty(doc.nodes[k].content)),
    positions: filter(doc.positions, k => !empty(doc.nodes[k].content)),
    editedAt: firebase.firestore.FieldValue.serverTimestamp()
  })
});

export default Stories;
