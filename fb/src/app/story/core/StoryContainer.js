import { useMouseWheel, useResizeObserver } from '@futo-ui/hooks'
import { empty, filter, keys, nonselectable } from '@futo-ui/utils'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * - Creates plane, binds resize observer to it & interaction of moving / grabbing. Also initializes playing.
 * - Props of the [`@mui/Box`](https://mui.com/api/box) are also available.
 */
const StoryContainer = ({ children, sx, ...props }) => {
  const router = useRouter(), { id } = router.query; // Has to be mounted after router.isReady

  return (
    <Box id={id} sx={{ height: "100%", left: 0, position: "fixed", top: 0, width: "100%", ...sx }} {...props}>
      { children }
    </Box>
  );
}

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
