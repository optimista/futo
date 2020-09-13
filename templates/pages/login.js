import { Box } from '@material-ui/core'
import Router from 'next/router'

import { LoginActions, LoginFields, LoginTitle, useLoginForm } from 'auth'
import { FocusLayout } from 'layouts'

const Login = () => {
  const [user, handleSubmit] = useLoginForm();

  function onSubmit(e) { handleSubmit(e, () => Router.push("/")); }

  return (
    <FocusLayout maxWidth="xs">
      <LoginTitle />
      <form onSubmit={onSubmit}>
        <Box my={4}>
          <LoginFields user={user} />
        </Box>
        <Box alignItems="center" display="flex">
          <LoginActions />
        </Box>
      </form>
    </FocusLayout>
  )
};

export default Login;
