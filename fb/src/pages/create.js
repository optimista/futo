import { useAutosave, useReducer } from '@futo-ui/hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { FixedLayout } from 'core/layouts'
import { Stories } from 'story'
import { AutosaveProvider, DispatchProvider, StoreProvider } from 'story/context'
import { StoryEditor } from 'story/edit'
import { caretReducer, grabReducer, renderReducer, storyReducer, viewReducer } from 'story/state'
import { storyEditPath } from 'story/utils'
import { Authorize, useAuth } from 'user'

const StoryCreatePage = () => {
  const [state, dispatch] = useReducer({ caretReducer, grabReducer, renderReducer, storyReducer, viewReducer }, { root: true }),
        auth = useAuth(), router = useRouter(), { id } = router.query,
        autosave = useAutosave({ query: () => Stories.doc(id).set(state.story) });

  useEffect(() => auth.isReady && (auth.isLoggedIn ?
    Stories.add({ ...state.story, profileId: auth.uid }).then(doc => router.replace(storyEditPath(doc), null, { shallow: true })) &&
    dispatch(state => ({ type: "STORY_LOAD", value: { ...state.story, profileId: auth.uid } })) : router.replace("/"))
  , [auth.isReady]);
  
  return (
    <FixedLayout>
      <Authorize ready={state.story.profileId}>
        <AutosaveProvider value={{ dispatch: autosave.dispatch }}>
          <DispatchProvider value={dispatch}>
            <StoreProvider value={state}>
              <StoryEditor id={id} />
            </StoreProvider>
          </DispatchProvider>
        </AutosaveProvider>
      </Authorize>
    </FixedLayout>
  )
}

export default StoryCreatePage;
