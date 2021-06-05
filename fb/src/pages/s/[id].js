import { useReducer } from '@futo-ui/hooks'
import { useRouter } from 'next/router'

import { Loading } from 'core'
import { FixedLayout } from 'layouts'
import { DispatchProvider, StoreProvider } from 'models/story/context'
import { grabReducer, renderReducer, storyReducer, viewReducer } from 'models/story/state'
import { StoryViewer, useStoryLoad } from 'models/story/view'

const StoryPage = () => {
  const [state, dispatch] = useReducer({ grabReducer, renderReducer, storyReducer, viewReducer }, { root: true }),
        router = useRouter(), { id } = router.query;

  useStoryLoad(story => dispatch([{ type: "STORY_LOAD", value: story }, { type: "VIEW_SHOW", keys: story.order.filter((_, i) => i === 0) }]));

  return (
    <FixedLayout>
      <Loading ready={state.story.profileId}>
        <DispatchProvider value={dispatch}>
          <StoreProvider value={state}>
            <StoryViewer id={id} />
          </StoreProvider>
        </DispatchProvider>
      </Loading>
    </FixedLayout>
  )
}

export default StoryPage;
