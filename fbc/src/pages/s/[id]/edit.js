import { useAutosave, useReducer } from '@futo-ui/hooks'
import { useRouter } from 'next/router'

import { Authorize } from 'auth'
import { FixedLayout } from 'layouts'
import { Stories } from 'models/story'
import { AutosaveProvider, DispatchProvider, StoreProvider } from 'models/story/context'
import { StoryEditor } from 'models/story/edit'
import { caretReducer, grabReducer, renderReducer, storyReducer, trashReducer, viewReducer } from 'models/story/state'
import { useStoryLoad } from 'models/story/view'

const StoryEditPage = () => {
  const [state, dispatch] = useReducer({ caretReducer, grabReducer, renderReducer, storyReducer, trashReducer, viewReducer }, { root: true }),
        router = useRouter(), { id } = router.query,
        autosave = useAutosave({ query: () => Stories.doc(id).set(state.story) });
      
  useStoryLoad(story => dispatch([{ type: "STORY_LOAD", value: story }, { type: "VIEW_SHOW", keys: story.order }]));
  
  return (
    <FixedLayout>
      <Authorize ready={Boolean(state.story.profileId)} redirect={"/s/" + id} uid={state.story.profileId}>
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

export default StoryEditPage;

/*
<FixedLayout toolbarRight={<>
  <Typography>All changes saved</Typography>
  <Button sx={{ mx: 2 }}>Publish</Button>
</>}>
  <Box sx={{ height: "100%", width: "100%", position: "fixed" }}>
  </Box>
</FixedLayout>
*/
