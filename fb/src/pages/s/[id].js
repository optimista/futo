import { keys } from '@futo-ui/utils'
import { useState } from 'react'

import { LoadingPage } from 'core'
import { FixedLayout } from 'core/layouts'
import { NodeContainer, StoryContainer, useStoryLoad } from 'story/core'
import { Text } from 'story/nodes'
import { StoreProvider } from 'story/context'

const StoryPage = () => {
  // Reducer
  const [state, setStory] = useState({ story: { nodes: {}, positions: {} } });

  // Loader
  useStoryLoad(story => setStory({ story }));

  return (
    <FixedLayout>
      <LoadingPage ready={Boolean(state.story.profileId)}>
        <StoreProvider value={state}>
          <StoryContainer>
            { keys(state.story.nodes).map(key => 
              <NodeContainer key={key} id={key}>
                <Text id={key} />
              </NodeContainer>
            )}
          </StoryContainer>
        </StoreProvider>
      </LoadingPage>
    </FixedLayout>
  )
}

export default StoryPage;
