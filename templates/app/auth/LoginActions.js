import { Box, Link } from '@material-ui/core'

import { Submit } from 'core'

const LoginActions = ({ submitting }) => (
  <>
    <Box flexGrow={1}><Link href="/join">Not have an account yet?</Link></Box>
    <Submit progress={submitting}>log in</Submit>
  </>
)

export default LoginActions;
