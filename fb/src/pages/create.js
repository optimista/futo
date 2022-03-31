import { addDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Stories } from 'story'
import { useReducer } from 'story/core'
import { storyEditPath } from 'story/utils'
import { useAuth } from 'user'

import StoryEditPage from './s/[id]/edit'

const StoryCreatePage = () => {
  const [{ story }] = useReducer(), auth = useAuth(), router = useRouter();

  useEffect(() => { if (auth.isReady) auth.isLoggedIn ?
    addDoc(Stories, { ...story, profileId: auth.uid }).then(doc => router.replace(storyEditPath(doc), null, { shallow: true })) 
    : router.replace("/") }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  , [auth.isReady]);
 
  return <StoryEditPage />
}

export default StoryCreatePage;
