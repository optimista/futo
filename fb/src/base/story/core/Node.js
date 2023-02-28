import { Box } from '@mui/material'
import PropTypes from 'prop-types'

import { useState } from 'story/context'

/**
 * - Container for the node in the story. 
 * - Integrates decorators for dragging & selecting, transition, positioning & observer for resizing.
 * - Props of the [`@mui/Box`](https://mui.com/api/box) are also available.
 */
const Node = ({ id: key, sx, ...props }) => {
  const state = useState(), { x, y } = state.story.positions[key];
  return <Box id={key} sx={{ left: x, position: "absolute", top: y, ...sx }} {...props} />
}

Node.propTypes = {
  /**
   * Identifier for the node. Important for resize observer. 
   */
  id: PropTypes.string, 

  /**
   * The @mui system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default Node;
