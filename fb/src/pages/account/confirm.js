import { useModel } from '@futo-ui/hooks'
import { Typography } from '@mui/material'
import { confirmPasswordReset, getAuth, signInWithEmailAndPassword, verifyPasswordResetCode } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Field, Form, Submit } from 'core/form'
import { FocusLayout } from 'core/layouts'
import { errorMessage } from 'core/utils'
import { I, IProvider, l, useLocale } from 'core/utils/i18n'
import { minLength } from 'core/validators'
import { userErrorMessage } from 'user'
import { RESET, USER_ERRORS } from 'user/i18n'

const ACCOUNT_RESET_CONFIRM = {
  "en": {
    "Immediately logged": "You will be immediately logged in afterwards.",
    "Confirm": "Confirm",
    "New password": "New password"
  },
  "es": {
    "Immediately logged": "Inmediatamente después se iniciará sesión.",
    "Confirm": "Confirmar",
    "New password": "Nueva contraseña"
  }
}

const AccountResetConfirm = () => {
  const locale = useLocale(), router = useRouter(), { oobCode = "" } = router.query,
        user = useModel({ email: "", password: "" }, { validation: {
                  generalError: err => errorMessage({ key: err.code }),
                  syncValidators: { password: { f: minLength(6), message: l("user/password-short", USER_ERRORS, locale) }}
                }, onSubmit: () => {
                  confirmPasswordReset(getAuth(), oobCode, user.password).then(() => {
                  signInWithEmailAndPassword(getAuth(), user.email, user.password).then(() => router.push("/"))
                }).catch(err => user.fail(userErrorMessage(err.code, locale)));
              }}); 

  useEffect(() => router.isReady &&
    verifyPasswordResetCode(getAuth(), oobCode).then(email => user.set('email', email), err => router.push({ pathname: "/account/reset", query: { err: window.btoa(JSON.stringify(userErrorMessage(err.code, locale))) }  })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]); // locale could technically be a problem, but so far it works
 
  return (
    <FocusLayout maxWidth="xs">
      <IProvider value={ACCOUNT_RESET_CONFIRM}>
        <Typography paragraph variant="h5"><I dict={RESET} k={user.email && "Reset your password."} width={220} /></Typography>
        <Typography><I k={user.email && "Immediately logged"} width={320} /></Typography>
        <Form model={user} actions={<Submit><I k={user.email && "Confirm"} width={60} /></Submit>}>
          <Field model={user} name="password" autoFocus label={<I k={user.email && "New password"} width={140} />} type="password" />
        </Form>
      </IProvider>
    </FocusLayout>
  )
}

export default AccountResetConfirm;
