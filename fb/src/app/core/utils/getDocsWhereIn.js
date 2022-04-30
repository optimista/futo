import { getDocs, query, where } from 'firebase/firestore'

const MAX_CLAUSES = 10;

const getDocsWhereIn = async (collection, field, array) => {
  const arrays = array.reduce((acc, item, index) => index % MAX_CLAUSES === 0 ? acc.concat([[item]]) : acc.map((arr, i) => i === acc.length - 1 ? acc[i].concat([item]) : arr), []),
        snapshots = await Promise.all(arrays.map(arr => getDocs(query(collection, where(field, "in", arr)))));

  return { forEach: fn => snapshots.forEach(snapshot => snapshot.forEach(fn)) }
}

export default getDocsWhereIn;
