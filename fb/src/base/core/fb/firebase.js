import { getApps, initializeApp } from 'firebase/app'

const firebase = getApps().length === 1 ? getApps()[0] : initializeApp({
})

export default firebase;
