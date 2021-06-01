import { CircularProgress } from '@material-ui/core'

import { FocusLayout } from 'layouts'

const LoadingScreen = ({ children = null, ready = false }) => 
  ready ?
    children
    :
    <FocusLayout>
      <CircularProgress size={40} />
    </FocusLayout>

export default LoadingScreen;
