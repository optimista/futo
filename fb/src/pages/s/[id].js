import { Loading } from 'core'
import { FixedLayout } from 'core/layouts'
import { NodeContainer, StoryAlign, StoryContainer, useStoryLoad } from 'story/core'
import { Image, Text } from 'story/nodes'
import { useRootReducer } from 'story/state'
import { DispatchProvider, StoreProvider } from 'story/context'

const StoryPage = () => {
  // Reducer
  const [state, dispatch] = useRootReducer();

  // Loader
  useStoryLoad(story => dispatch({ type: "INIT_VIEWER", story }));

  // Renders
  const renderNode = key => { switch(state.story.nodes[key].type) {
    case "image": return <Image id={key} />;
    default: return <Text id={key} />;
  }}

  return (
    <FixedLayout>
      <Loading ready={state.story.profileId}>
        <DispatchProvider value={dispatch}>
          <StoreProvider value={state}>
            <StoryContainer>
              <StoryAlign>
                { state.story.order.map(key => 
                  <NodeContainer key={key} id={key}>
                    {renderNode(key)}
                  </NodeContainer>
                )}
              </StoryAlign>
            </StoryContainer>
          </StoreProvider>
        </DispatchProvider>
      </Loading>
    </FixedLayout>
  )
}

export default StoryPage;
