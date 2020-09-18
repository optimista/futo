import { useForm, useModel } from '@futo-ui/hooks'
import { Box, TextField, Typography } from '@material-ui/core'

import { Submit } from 'core'
import { errors } from 'locals'
import { firebase } from 'utils'

const PasswordResetForm = ({ errorCode }) => {
  const user = useModel({ email: "" }),
        form = useForm({ action: ({ fail, complete }) => {
          firebase.auth().sendPasswordResetEmail(user.email).then(complete).catch(err => {
            fail();
            switch(err.code) {
              case "auth/invalid-email":
              case "auth/user-not-found":
              default:
                user.setErrors({ email: errors[err.code] });
                break;
            }
          });
        }});

  return (
    <>
      <Typography paragraph variant="h5">{ form.isSuccess ? "Reset link successfully sent!" : (errorCode ? "Try resetting your password again" : "Reset your password")}</Typography>
      { !form.isSuccess && <Typography variant="body2">{ errorCode ? errors[errorCode] : "Send a password reset link on your e-mail address." }</Typography> }
      <form onSubmit={form.handleSubmit}>
        <Box my={4}>
          { form.isSuccess ? <Typography>{"✓ We've sent an email to "+user.email+". Click the link in the email to reset your password."}</Typography> : <TextField autoFocus error={Boolean(user.errors.email)} fullWidth helperText={user.errors.email || "Email"} onChange={user.handleChange('email')} type="email" value={user.email} /> }
        </Box>
        <Box align="right">
          { !form.isSuccess && <Submit progress={form.isLoading}>Recover</Submit> }
        </Box>
      </form>
    </>
  )
}

export default PasswordResetForm;
