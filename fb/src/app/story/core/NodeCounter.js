import { empty, filter, keys, nonselectable } from '@futo-ui/utils'
import { Box } from '@material-ui/core'

import { useState } from 'story/context'

const NodeCounter = ({ sx, ...props }) => {
  const state = useState();

  return (
    <Box sx={{ backgroundColor: "white", border: "1px solid #f0f0e1", borderRadius: "6px", left: "50%", padding: "0.25rem 0.6rem", position: "fixed", top: 32, transform: "translate(-50%, -50%)", zIndex: 999, ...nonselectable }} {...props}>
      {
        keys(filter(state.story.nodes, (k, n) => !empty(n.content) && state.view.shown[k])).length
        + " / " +
        keys(filter(state.story.nodes, (_, n) => !empty(n.content))).length
      }
    </Box>
  );
}

export default NodeCounter;
