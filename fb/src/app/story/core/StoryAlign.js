import { Box } from '@material-ui/core'

import { useState } from 'story/context'

const StoryAlign = ({ children }) => {
  const state = useState();
  return (
    <Box sx={{ position: "absolute", left: "50%", top: 0 }}>
      <Box style={{ left: state.view.move.x, top: state.view.move.y, transform: "translate("+state.view.present.x+"px, "+state.view.present.y+"px)" }} sx={{
        transition: t => t.transitions.create('transform', { duration: t.transitions.duration.complex, easing: t.transitions.easing.ease }),
        position: "absolute", width: 99999
      }}>
        {children}
      </Box>
    </Box>
  )
}

export default StoryAlign;
