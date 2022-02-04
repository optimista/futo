import { CircularProgress } from '@mui/material'
import PropTypes from 'prop-types'

import { FocusLayout } from 'core/layouts'

/**
 * - Shows a loading spinner if content is not ready / fetched to be shown. 
 */
const LoadingPage = ({ children = null, ready = false }) => 
  ready ?
    children
    :
    <FocusLayout>
      <CircularProgress size={40} sx={{ display: "block", margin: "auto" }} />
    </FocusLayout>

LoadingPage.propTypes = {
  /**
   * The content of the component.
   * @default null
   */
  children: PropTypes.node,
  
  /**
   * Determines whether the contents are loaded / ready. 
   * @default false 
   */
  ready: PropTypes.bool,
};

export default LoadingPage;
