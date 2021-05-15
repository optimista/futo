import { useModel } from '@futo-ui/hooks'
import { Skeleton, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Field, Form, Submit } from 'core/form'
import { FocusLayout } from 'layouts'
import { ERRORS } from 'locales'
import { firebase, firebaseError } from 'utils'
import { minLength } from 'utils/validators'

const AccountResetConfirm = () => {
  const router = useRouter(), { oobCode = "" } = router.query,
    user = useModel({ email: "", password: "" }, { validation: {
              generalError: err => firebaseError(err),
              syncValidators: { password: { f: minLength(6), message: ERRORS["futo/password-short"] }}
            }, onSubmit: () => {
            firebase.auth().confirmPasswordReset(oobCode, user.password).then(() => {
              firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(() => router.push("/"))
            }).catch(err => user.fail(firebaseError(err)));
          }}); 

  useEffect(() => router.isReady && firebase.auth().verifyPasswordResetCode(oobCode).then(email => user.set('email', email), err => router.push({ pathname: "/account/reset", query: { err: btoa(JSON.stringify(firebaseError(err))) }  })), [router.isReady]); 
 
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
