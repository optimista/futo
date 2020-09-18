import { Box, Link, Typography } from '@material-ui/core'
import Router from 'next/router'

import { LoginActions, LoginFields, LoginLinks, LoginTitle, useLoginForm } from 'auth/login'
import { FocusLayout } from 'layouts'

const Login = () => {
  const [form, user] = useLoginForm({ callback: () => Router.push("/") });

  return (
    <FocusLayout maxWidth="xs">
      <LoginTitle />
      <form onSubmit={form.handleSubmit}> 
        <Box my={4}>
          <LoginFields user={user} />
        </Box>
        <Box alignItems="center" display="flex">
          <LoginActions submitting={form.submitting} />
        </Box>
        <Box my={3}>
          <LoginLinks />
        </Box>
      </form>
    </FocusLayout>
  )
};

export default Login;
