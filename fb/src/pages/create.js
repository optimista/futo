import { getAuth, signInAnonymously } from 'firebase/auth'
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

  useEffect(() => { 
    const ls = window.localStorage;
    if (auth.isReady && !auth.isLoggedIn) signInAnonymously(getAuth()).then(auth => ls.setItem("auids", JSON.stringify((JSON.parse(ls.getItem("auids")) || []).concat([auth.user.uid]))));
    if (auth.isReady && auth.isLoggedIn && (auth.isAnonymous || auth.profile)) {
      addDoc(Stories, { ...story, profileId: auth.uid, ...(auth.isAnonymous ? { isAnonymous: true } : {}),
        ...(auth.profile ? { profileDisplayName: auth.profile.displayName, profilePhotoURL: auth.profile.photoURL, profileUsername: auth.profile.username } : {}) })
        .then(doc => { router.replace(storyEditPath(doc), null, { shallow: true }); if (auth.isAnonymous) ls.setItem("ascount", (parseInt(ls.getItem("ascount")) || 0) + 1); });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isReady, auth.isLoggedIn, auth.profile]);
 
  return <StoryEditPage />
}

export default StoryCreatePage;
