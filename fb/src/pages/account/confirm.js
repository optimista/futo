import { useModel } from '@futo-ui/hooks'
import { Skeleton, Typography } from '@mui/material'
import { confirmPasswordReset, getAuth, signInWithEmailAndPassword, verifyPasswordResetCode } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Field, Form, Submit } from 'core/form'
import { FocusLayout } from 'core/layouts'
import { errorMessage } from 'core/utils'
import { minLength } from 'core/validators'
import { userErrorMessage } from 'user'
import { USER_ERRORS } from 'user/locales'

const AccountResetConfirm = () => {
  const router = useRouter(), { oobCode = "" } = router.query,
    user = useModel({ email: "", password: "" }, { validation: {
              generalError: err => errorMessage(err),
              syncValidators: { password: { f: minLength(6), message: USER_ERRORS["user/password-short"] }}
            }, onSubmit: () => {
              confirmPasswordReset(getAuth(), oobCode, user.password).then(() => {
              signInWithEmailAndPassword(getAuth(), user.email, user.password).then(() => router.push("/"))
            }).catch(err => user.fail(userErrorMessage(err)));
          }}); 

  useEffect(() => router.isReady &&
    verifyPasswordResetCode(getAuth(), oobCode).then(email => user.set('email', email), err => router.push({ pathname: "/account/reset", query: { err: window.btoa(JSON.stringify(userErrorMessage(err))) }  })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]); 
 
  return (
    <FocusLayout maxWidth="xs">
      { user.email ? <Typography paragraph variant="h5">Reset your password.</Typography> : <Skeleton height={36} />}
      { user.email ? <Typography>You will be immediately logged in afterwards.</Typography> : <Skeleton height={24} />}
      <Form model={user} actions={user.email ? <Submit>Confirm</Submit> : <Skeleton height={40} width={127} variant="rectangular" /> }>
        { user.email ? <Field model={user} name="password" autoFocus label="New Password" type="password" /> : <Skeleton height={88} variant="rectangular" /> }
      </Form>
    </FocusLayout>
  )
}

export default AccountResetConfirm;
