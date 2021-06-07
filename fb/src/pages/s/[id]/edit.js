import { useAutosave, useReducer } from '@futo-ui/hooks'
import { useRouter } from 'next/router'

import { FixedLayout } from 'core/layouts'
import { Stories } from 'story'
import { AutosaveProvider, DispatchProvider, StoreProvider } from 'story/context'
import { StoryEditor } from 'story/edit'
import { caretReducer, grabReducer, renderReducer, storyReducer, trashReducer, viewReducer } from 'story/state'
import { storyPath } from 'story/utils'
import { useStoryLoad } from 'story/view'
import { Authorize } from 'user'

const StoryEditPage = () => {
  const [state, dispatch] = useReducer({ caretReducer, grabReducer, renderReducer, storyReducer, trashReducer, viewReducer }, { root: true }),
        router = useRouter(), { id } = router.query,
        autosave = useAutosave({ query: () => Stories.doc(id).set(state.story) });
      
  useStoryLoad(story => dispatch([{ type: "STORY_LOAD", value: story }, { type: "VIEW_SHOW", keys: story.order }]));
  
  return (
    <FixedLayout>
      <Authorize ready={Boolean(state.story.profileId)} redirect={storyPath(state.story)} uid={state.story.profileId}>
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
