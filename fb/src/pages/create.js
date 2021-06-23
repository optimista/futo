import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Stories } from 'story'
import { storyReducer, useRootReducer } from 'story/state'
import { storyEditPath } from 'story/utils'
import { useAuth } from 'user'

import StoryEditPage from './s/[id]/edit'

const StoryCreatePage = () => {
  const { story } = useRootReducer({ storyReducer })[0], auth = useAuth(), router = useRouter();

  useEffect(() => auth.isReady && (auth.isLoggedIn ?
    Stories.add({ ...story, profileId: auth.uid }).then(doc => router.replace(storyEditPath(doc), null, { shallow: true })) 
    : router.replace("/"))
  , [auth.isReady]);
 
  return <StoryEditPage />
}

export default StoryCreatePage;
