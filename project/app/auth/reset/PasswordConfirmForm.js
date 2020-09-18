import { useForm, useModel } from '@futo-ui/hooks'
import { Box, TextField, Typography } from '@material-ui/core'
import Router from 'next/router'

import { Submit } from 'core'
import { firebase } from 'utils'

const PasswordConfirmForm = ({ actionCode, email, onError }) => {
  const user = useModel({ password: "" }),
        form = useForm({ action: ({ complete, fail }) => {
          firebase.auth().confirmPasswordReset(actionCode, user.password).then(() => {
            firebase.auth().signInWithEmailAndPassword(email, user.password).then(() => {
              Router.push("/")
            })
          }).catch(err => {
            fail();
            switch(err.code) {
              case 'auth/weak-password': user.setErrors({ password: err.message }); break;
              default: onError(err.code); break;
            }
          });
        }}); 

  return (
    <>
      <Typography paragraph variant="h5">Reset your password.</Typography>
      <Typography variant="body2">After successfully changing your password, you will be immediately logged in.</Typography>
      <form onSubmit={form.handleSubmit}>
        <Box my={4}>
          <TextField error={Boolean(user.errors.password)} fullWidth helperText={user.errors.password || "New Password"} onChange={user.handleChange('password')} value={user.password} type="password" />
        </Box>
        <Box align="right">
          <Submit progress={form.isLoading}>Confirm</Submit>
        </Box>
      </form>
    </>
  )
}

export default PasswordConfirmForm;
