import { last } from '@futo-ui/utils'
import { writeBatch } from 'firebase/firestore'

import { db } from 'core/utils'

const MAX_SIZE = 500;

const createBatch = () => {
  let batches = []; const batch = () => {
    const lastBatchObj = last(batches),
          newLastBatch = batches.length === 0 || lastBatchObj.ops === MAX_SIZE ? last(batches = batches.concat([{ batch: writeBatch(db()), ops: 0 }])) : lastBatchObj;

    newLastBatch.ops++;
    return newLastBatch.batch; 
  };
  
  return {
    commit: () => Promise.all(batches.map(({ batch }) => batch.commit())),
    delete: documentRef => batch().delete(documentRef),
    set: (...args) => batch().set(...args),
    update: (...args) => batch().update(...args)
  }
}

export default createBatch;
