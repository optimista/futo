import { CircularProgress } from '@mui/material'

import { FocusLayout } from 'core/layouts'

/**
 * - Shows a loading spinner if content is not ready / fetched to be shown. 
 */
const Loading = () => 
  <FocusLayout>
    <CircularProgress size={40} sx={{ display: "block", margin: "auto" }} />
  </FocusLayout>

export default Loading;
