import { useForm, useModel } from '@futo-ui/hooks'
import { Box, Link, TextField, Typography } from '@material-ui/core'
import Router from 'next/router'

import { Submit } from 'core'
import { FocusLayout } from 'layouts'
import { errors } from 'locals'
import { firebase } from 'utils'

const Join = () => {
  const user = useModel({ email: "", password: "" });
  const form = useForm({ action: ({ fail, complete }) => {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(() => {
      Router.push("/")
    }).catch(err => {
      fail();
      switch(err.code) {          
        case "auth/email-already-in-use":
        case "auth/invalid-email":
        case "auth/operation-not-allowed":
          user.setErrors({ email: errors[err.code] });
          break;
        case "auth/weak-password":
          user.setErrors({ password: err.message });
          break;
      }
    })
  }});

  return (
    <FocusLayout maxWidth="xs">
      <Typography variant="h5">Curate your stories.</Typography>
      <Typography variant="h5">Have a free account.</Typography>
      <form onSubmit={form.handleSubmit}>
        <Box my={4}>
          <TextField autoFocus error={Boolean(user.errors.email)} fullWidth helperText={user.errors.email || "Email"} onChange={user.handleChange('email')} value={user.email} type="email" />
          <TextField error={Boolean(user.errors.password)} fullWidth helperText={user.errors.password || "Password"} onChange={user.handleChange('password')} value={user.password} type="password" />
        </Box>
        <Box alignItems="center" display="flex">
          <Box flexGrow={1}><Link href="/login">Already registered?</Link></Box>
          <Submit progress={form.isLoading}>Get started now</Submit>
        </Box>
      </form>
    </FocusLayout>
  );
}

export default Join;
