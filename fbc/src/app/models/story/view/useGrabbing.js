import { useEffect } from 'react'

import { useDispatch, useState } from 'models/story/context'

const useGrabbing = ({ onMouseMoveDispatch = () => [], onMouseUp = () => {} } = { onMouseMoveDispatch: () => [], onMouseUp: () => {}}) => {
  const dispatch = useDispatch(), state = useState();

  const handleMouseMove = e => state.grab.handle && dispatch(state => {
    const actions = [{ type: "GRAB_DRAG", x: e.screenX, y: e.screenY }],
          { handle, key, last } = state.grab, deltas = { dx: e.screenX - last.x, dy: e.screenY - last.y };

    if (handle === "container") return [...actions, { type: "VIEW_MOVE", ...deltas }];
    return [...actions, ...onMouseMoveDispatch({ handle, key, deltas })];
  });

  const handleMouseUp = () => { const { handle } = state.grab; if (handle) { dispatch({ type: "GRAB_END" }); onMouseUp({ handle }); } }
  
  useEffect(() => {
    if (state.grab.handle) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      }
    }
  }, [state.grab.handle])
}
  
export default useGrabbing;
