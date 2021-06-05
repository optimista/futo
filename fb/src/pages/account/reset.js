import { useModel } from '@futo-ui/hooks'
import { Alert, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Field, Form, Submit } from 'core/form'
import { FocusLayout } from 'layouts'
import { ERRORS } from 'locales'
import { firebase, firebaseError } from 'utils'
import { emailFormatAt, emailFormatDomain, presence } from 'utils/validators'

const AccountReset = () => {
  const router = useRouter(), { err } = router.query,
        user = useModel({ email: "" }, {
          validation: { disableInline: true, 
            generalError: err => firebaseError(err),
            syncValidators: {
              email: [
                { f: presence, message: ERRORS["futo/email-empty"] },
                { f: emailFormatAt, message: ERRORS["futo/email-without-at"] },
                { f: emailFormatDomain, message: ERRORS["futo/email-invalid-domain"] },
              ],
            }
          },
          onSubmit: () => { firebase.auth().sendPasswordResetEmail(user.email).then(user.success).catch(err => user.fail(firebaseError(err))); }
        });

  useEffect(() => router.isReady && err && user.fail(JSON.parse(atob(err))), [router.isReady]);

  return (
    <FocusLayout maxWidth="xs">
      { 
        user.isSuccess ? <>
          <Typography paragraph variant="h5">Reset link successfully sent!</Typography>
          <Alert severity="success">{"We've sent an email to "+user.email+". Click the link in the email to reset your password."}</Alert>
        </> : <>
          <Typography paragraph variant="h5">Reset your password</Typography>
          <Typography>Send a password reset link on your e-mail address.</Typography>
          <Form model={user} actions={<Submit>Send reset link</Submit>}>
            <Field autoFocus name="email" type="email" />
          </Form>
        </>
      }
    </FocusLayout>
  )
}

export default AccountReset;
