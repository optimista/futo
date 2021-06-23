import { useResizeObserver } from '@futo-ui/hooks'
import { nonselectable } from '@futo-ui/utils'
import { Box } from '@material-ui/core'

import { useDispatch, useState } from 'story/context'

const NodeContainer = ({ children, grabbable = false, id: key, sx, ...props }) => {
  const dispatch = useDispatch(), state = useState(), { x, y } = state.story.positions[key],
        ref = useResizeObserver(key, { onResize: ({ height, width }) => dispatch({ type: "RENDER_NODE_RESIZE", key, height, width }) });

  return <Box id={key} ref={ref} sx={{
    left: x, position: "absolute", top: y,
    transition: t => t.transitions.create('opacity', { duration: t.transitions.duration.standard, easing: t.transitions.easing.easeInOut }),
    ...(state.grab.dragged ? nonselectable : {}),
    ...(state.grab.dragged && state.grab.handle === "node" && state.grab.key === key ? { pointerEvents: "none" } : {}),
    ...(state.grab.dragged && state.grab.handle === "node" && state.grab.key === key && state.trash.over ? { opacity: 0.5 } : {}),
    ...(state.view.shown[key] ? {} : { opacity: 0, pointerEvents: "none" }),
    ...state.story.sx?.[key],
    ...sx
  }} {...props}>{children}</Box>
}

export default NodeContainer;
