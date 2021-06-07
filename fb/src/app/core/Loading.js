import { CircularProgress } from '@material-ui/core'

import { FocusLayout } from 'core/layouts'

const LoadingScreen = ({ children = null, ready = false }) => 
  ready ?
    children
    :
    <FocusLayout>
      <CircularProgress size={40} sx={{ display: "block", margin: "auto" }} />
    </FocusLayout>

export default LoadingScreen;
