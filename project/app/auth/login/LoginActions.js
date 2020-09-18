import { Box, Link } from '@material-ui/core'

import { Submit } from 'core'

const LoginActions = ({ progress }) => (
  <>
    <Box flexGrow={1}><Link href="/join">Not have an account yet?</Link></Box>
    <Submit progress={progress}>log in</Submit>
  </>
)

export default LoginActions;
