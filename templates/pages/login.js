import { Box } from '@material-ui/core'
import Router from 'next/router'

import { LoginActions, LoginFields, LoginTitle, useLoginForm } from 'auth'
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
      </form>
    </FocusLayout>
  )
};

export default Login;
