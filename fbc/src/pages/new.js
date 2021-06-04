import { useAutosave, useReducer } from '@futo-ui/hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Authorize, useAuth } from 'auth'
import { FixedLayout } from 'layouts'
import { Stories } from 'models/story'
import { AutosaveProvider, DispatchProvider, StoreProvider } from 'models/story/context'
import { StoryEditor } from 'models/story/edit'
import { caretReducer, grabReducer, renderReducer, storyReducer, viewReducer } from 'models/story/state'
import { storyEditPath } from 'models/story/utils'

const StoryNewPage = () => {
  const [state, dispatch] = useReducer({ caretReducer, grabReducer, renderReducer, storyReducer, viewReducer }, { root: true }),
        auth = useAuth(), router = useRouter(), { id } = router.query,
        autosave = useAutosave({ query: () => Stories.doc(id).set(state.story) });

  useEffect(() => auth.isReady &&
    Stories.add({ ...state.story, profileId: auth.uid }).then(doc => router.replace(storyEditPath(doc), null, { shallow: true })) &&
    dispatch(state => ({ type: "STORY_LOAD", value: { ...state.story, profileId: auth.uid } }))
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

export default StoryNewPage;
