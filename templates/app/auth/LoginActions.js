import { Box, Button, Link } from '@material-ui/core'

const LoginActions = () => (
  <>
    <Box flexGrow={1}><Link href="/join">Not have an account yet?</Link></Box>
    <Button type="submit">log in</Button>
  </>
)

export default LoginActions;
