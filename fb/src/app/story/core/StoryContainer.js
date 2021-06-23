import { useMouseWheel, useResizeObserver } from '@futo-ui/hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Box } from '@material-ui/core'

import { NodeCounter } from 'story/core'
import { useDispatch, useState } from 'story/context'

const StoryContainer = ({ children, sx, ...props }) => {
  const dispatch = useDispatch(), router = useRouter(), state = useState(), { id } = router.query, // Has to be mounted after router.isReady
        ref = useResizeObserver(id, { onResize: ({ height, width }) => dispatch({ type: "render-container-resize", height, width }) });

  // useGrabbing
  const handleMouseMove = e => dispatch({ type: "GRAB_MOVE", x: e.screenX, y: e.screenY });
  const handleMouseUp = () => dispatch({ type: "GRAB_MOUSE_UP" });
  
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
 
  // usePlayer
  useMouseWheel({ up: () => dispatch({ type: "PLAYER_PREV" }), down: () => dispatch({ type: "PLAYER_NEXT" }) }); 

  const handleMouseDown = e => e.button === 0 && e.currentTarget === e.target &&
    dispatch({ type: "grab-start", handle: "container", x: e.screenX, y: e.screenY });

  return (
    <Box id={id} ref={ref} sx={{ height: "100%", left: 0, position: "fixed", top: 0, width: "100%", ...sx }} onMouseDown={handleMouseDown} {...props}>
      <NodeCounter />
      { children }
    </Box>
  );
}

export default StoryContainer;
