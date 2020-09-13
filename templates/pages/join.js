import { useModel } from '@futo-ui/hooks'
import { Box, Button, Link, TextField, Typography } from '@material-ui/core'
import Router from 'next/router'

import { FocusLayout } from 'layouts'
import { firebase } from 'utils'

const Join = () => {
  const user = useModel({ email: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(() => Router.push('/'));
  }

  return (
    <FocusLayout maxWidth="xs">
      <Typography variant="h5">Curate your stories.</Typography>
      <Typography variant="h5">Have a free account.</Typography>
      <form onSubmit={handleSubmit}>
        <Box my={4}>
          <TextField fullWidth helperText="Email"    onChange={user.handleChange('email')}    value={user.email}    type="email" />
          <TextField fullWidth helperText="Password" onChange={user.handleChange('password')} value={user.password} type="password" />
        </Box>
        <Box alignItems="center" display="flex">
          <Box flexGrow={1}><Link href="/login">Already registered?</Link></Box>
          <Button type="submit">Get started now</Button>
        </Box>
      </form>
    </FocusLayout>
  );
}

export default Join;
