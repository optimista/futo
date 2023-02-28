import { Box } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * - Creates plane. 
 * - Props of the [`@mui/Box`](https://mui.com/api/box) are also available.
 */
const StoryContainer = ({ children, sx, ...props }) =>
  <Box sx={{ height: "100%", left: 0, position: "fixed", top: 0, width: "100%", ...sx }} {...props}>
    { children }
  </Box>

StoryContainer.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  
  /**
   * The @mui system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export { StoryContainer as default };
