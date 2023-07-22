'use client';

import { getAuth, signInAnonymously } from 'firebase/auth'
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { Stories } from 'core/fb/colls'
import { useReducer } from 'story/core'
import { storyEditPath } from 'story/utils'
import { useAuth } from 'user'

import StoryEditPage from './../s/[id]/edit/page'

const StoryCreatePage = () => {
  const [{ story }] = useReducer(), auth = useAuth(), router = useRouter(), effectState = useRef({ creatingStory: false, signingIn: false  }); // reactStrictMode

  useEffect(() => { 
    if (auth.isReady) {
      if (!auth.isLoggedIn) {
        if (!effectState.current.signingIn) {
          effectState.current.signingIn = true;
          signInAnonymously(getAuth());
        }
      } else if (!effectState.current.creatingStory && (auth.isAnonymous || auth.profile)) {
        effectState.current.creatingStory = true;
        addDoc(Stories, { ...story, editedAt: serverTimestamp(), profileId: auth.uid, ...(auth.isAnonymous ? { isAnonymous: true } : {}),
          ...(auth.profile ? { profileDisplayName: auth.profile.displayName, profilePhotoURL: auth.profile.photoURL, profileUsername: auth.profile.username } : {}) }).then(doc =>
            router.replace(storyEditPath(doc)));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isReady, auth.isLoggedIn, auth.profile]);

  return <StoryEditPage />
}

export default StoryCreatePage;
