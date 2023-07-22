import { doc, getDoc } from 'firebase/firestore'
import { cache } from 'react'

import { Usernames } from 'core/fb/colls'

const getUsername = async username => {
  const docUsername = await cache(username => getDoc(doc(Usernames, username)))(username);
  return docUsername;
}

export default getUsername;
