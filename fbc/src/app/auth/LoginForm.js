import { Box, Link, Typography } from '@material-ui/core'

import { Field, Form, Submit } from 'core/form'

const LoginForm = ({ user }) =>
  <>
    <Typography variant="h5">Return to your stories.</Typography>
    <Typography variant="h5">Log into your account.</Typography>
    <Form model={user} actionsJustify="space-between" actions={<>
      <Link href="/join" variant="body2">Not have an account yet?</Link>
      <Submit>log in</Submit>
    </>}>
      <Field name="email" type="email" autoFocus />
      <Field name="password" type="password" />
    </Form>
    <Box sx={{ borderTop: theme => "1px dashed "+theme.palette.divider, mt: 4, pt: 3, textAlign: "center" }}>
      <Link color="textSecondary" href="/account/reset" variant="body2">Forgot your password?</Link>
    </Box>
  </>

export default LoginForm;
