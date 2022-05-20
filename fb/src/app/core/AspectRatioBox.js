import { pct } from '@futo-ui/utils'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * - Preserves [`@mui/Box`](https://mui.com/api/box) ratio within given dimensional constraint.
 */
const AspectRatioBox = ({ children, ratio = 1, sx, ...props }) =>
  <Box sx={{ position: "relative", ...sx }} {...props}> 
    <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, '& > *:not([role="tooltip"])': { height: "100%", maxHeight: "none", maxWidth: "none", width: "100%" } }}>
      {children}
    </Box>
    <Box sx={{ paddingBottom: pct(1/ratio) }} />
  </Box>

AspectRatioBox.propTypes = {
  /**
   * The content of the component. 
   */
  children: PropTypes.node,

  /**
   * The width-to-height ratio of the [`@mui/Box`](https://mui.com/api/box).
   * @default 1
   */
  ratio: PropTypes.number,
  
  /**
   * The @mui system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

export default AspectRatioBox;
