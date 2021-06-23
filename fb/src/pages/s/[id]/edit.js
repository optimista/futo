import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import { FixedLayout } from 'core/layouts'
import { storage } from 'core/utils'
import { Stories } from 'story'
import { NodeContainer, StoryAlign, StoryContainer, StoryNotification, Trash, useStoryLoad } from 'story/core'
import { DispatchProvider, StoreProvider } from 'story/context'
import { ImageEditable, TextEditable } from 'story/nodes'
import { autosaveReducer, caretReducer, preloadsReducer, trashReducer, useRootReducer } from 'story/state'
import { storyPath } from 'story/utils'
import { Authorize } from 'user'

const StoryEditPage = () => {
  // Reducer
  const [state, dispatch] = useRootReducer({ autosaveReducer, caretReducer, preloadsReducer, trashReducer });
    
  // Loader
  useStoryLoad(story => dispatch({ type: "INIT_EDITOR", story }));

  // Autosave
  const router = useRouter(), { id } = router.query, timer = useRef(null);
  useEffect(() => {
    let ignore = false;
    if (state.autosave.pending) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => { if (!ignore) {
        dispatch({ type: "autosave-notification-show" });
        Stories.doc(id).set(state.story).then(() => !ignore && dispatch({ type: "AUTOSAVE_SUCCESS" }))
        // Needs to be moved to Cloud Functions:
        storage("stories/"+id+"/").listAll().then(res => !ignore && res.items.map(ref => !state.story.nodes[ref.name] && ref.delete())) 
      }}, 2000); }
    return () => ignore = true;
  }, [state.autosave.trigger]);
 
  // Handlers
  const handleContainerMouseUp = e => e.currentTarget === e.target &&
    dispatch({ type: "CONTAINER_LEFT_MOUSE_UP", x: e.clientX, y: e.clientY });
  
  const handleNodeMouseDown = key => e => e.button === 0 &&
    dispatch({ type: "GRAB_START_NODE", key, x: e.screenX, y: e.screenY });

  // Renders
  const renderNode = key => { switch(state.story.nodes[key].type) {
    case "image": return <ImageEditable id={key} />;
    default: return <TextEditable id={key} />;
  }}

  return (
    <FixedLayout toolbarLeft={
      <StoryNotification show={state.autosave.notification}>{state.autosave.pending ? "Saving..." : "Saved."}</StoryNotification>}>
      <Authorize ready={Boolean(state.story.profileId)} redirect={storyPath(state.story)} uid={state.story.profileId}>
        <DispatchProvider value={dispatch}>
          <StoreProvider value={state}>
            <StoryContainer onMouseUp={handleContainerMouseUp} sx={{ cursor: "pointer" }}>
              <StoryAlign>
                { state.story.order.map(key => 
                  <NodeContainer id={key} key={key} onMouseDown={handleNodeMouseDown(key)}>
                    {renderNode(key)}
                  </NodeContainer>
                )}
              </StoryAlign>
              { state.grab.dragged && state.grab.handle === "node" && <Trash /> }
            </StoryContainer>
          </StoreProvider>
        </DispatchProvider>
      </Authorize>
    </FixedLayout>
  )
}

export default StoryEditPage;
