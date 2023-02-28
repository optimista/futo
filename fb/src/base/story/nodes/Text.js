import { Box } from '@mui/material'
import PropTypes from 'prop-types'

import { useState } from 'story/context'

/**
 * - Obtains and shows the content of [`story/nodes/Text`](/docs/story-nodes-text--default) node.
 * - Props of the [`@mui/Box`](https://mui.com/api/box) are also available.
 */
const Text = ({ id: key, ...props }) => {
  const state = useState(), { content } = state.story.nodes[key];
  return <Box {...props}>{content}</Box>
}

Text.propTypes = {
  /**
   * Identifier for the node to obtain `content`.
   */
  id: PropTypes.string, 
};

export default Text;
