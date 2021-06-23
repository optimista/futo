import { Box } from '@material-ui/core'

import { useState } from 'story/context'

const Text = ({ id: key, ...props }) => {
  const state = useState(), { content } = state.story.nodes[key];
  return <Box {...props}>{content}</Box>
}

export default Text;
