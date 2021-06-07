import { useResizeObserver } from '@futo-ui/hooks'
import { Box } from '@material-ui/core'

import { useDispatch, useState } from 'story/context'
import { Trash } from 'story/edit'
import { NodeCounter, usePresentPending, usePlayer } from 'story/view'

const StoryContainer = ({ children, id: key, sx, ...props }) => {
  const dispatch = useDispatch(), state = useState(),
        ref = useResizeObserver(key, { onResize: ({ height, width }) => dispatch([{ type: "RENDER_CONTAINER_RESIZE", height, width }]) });
  
  usePresentPending();
  usePlayer();

  const handleMouseDown = e => e.button === 0 && e.currentTarget === e.target &&
    dispatch({ type: "GRAB_START", handle: "container", x: e.screenX, y: e.screenY });

  return (
    <Box id={key} ref={ref} sx={{ height: "100%", left: 0, position: "fixed", top: 0, width: "100%", ...sx }} onMouseDown={handleMouseDown} {...props}>
      <NodeCounter />
      <Box sx={{ position: "absolute", left: "50%", top: 0 }}>
        <Box style={{ left: state.view.move.x, top: state.view.move.y, transform: "translate("+state.view.present.x+"px, "+state.view.present.y+"px)" }} sx={{
          transition: t => t.transitions.create('transform', { duration: t.transitions.duration.complex, easing: t.transitions.easing.ease }),
          position: "absolute", width: 99999
        }}>
          {children}
        </Box>
      </Box>
      { state.grab.handle === "node" && <Trash /> }
    </Box>
  );
}

export default StoryContainer;
