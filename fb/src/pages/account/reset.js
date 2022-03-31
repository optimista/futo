import { useModel } from '@futo-ui/hooks'
import { Alert, Typography } from '@mui/material'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Field, Form, Submit } from 'core/form'
import { FocusLayout } from 'core/layouts'
import { errorMessage } from 'core/utils'
import { I, IProvider, l, useLocale } from 'core/utils/i18n'
import { presence } from 'core/validators'
import { userErrorMessage } from 'user'
import { RESET, USER_ERRORS, USER_FIELDS } from 'user/i18n'
import { emailFormatAt, emailFormatDomain } from 'user/validators'

const ACCOUNT_RESET = {
  emailSent: (weveSentTo, email, clickTheLink) => weveSentTo + email + ". " + clickTheLink, 
  "en": {
    "Reset link sent": "Reset link successfully sent!",

    "We've sent": email => ACCOUNT_RESET.emailSent("We've sent an email to ", email, "Click the link the email to reset your password."),
    "Send a password reset": "Send a password reset link on your e-mail address.",
    "Send reset link": "Send reset link"
  },
  "es": {
    "Reset link sent": "¡Enlace para restablecer enviado con éxito!",
    "We've sent": email => ACCOUNT_RESET.emailSent("Hemos enviado un correo e. a ", email, "Haga clic en el enlace del correo e. para restablecer su contraseña."),
    "Send a password reset": "Envíe un enlace de restablecimiento de contraseña en su correo e.",
    "Send reset link": "Enviar enlace de restablecimiento"
  },
}

const AccountReset = () => {
  const locale = useLocale(), router = useRouter(), { err } = router.query,
        user = useModel({ email: "" }, {
          validation: { disableInline: true, 
            generalError: err => errorMessage({ key: err.code, locale }), 
            syncValidators: {
              email: [
                { f: presence, message: l("user/email-empty", USER_ERRORS, locale) },
                { f: emailFormatAt, message: l("user/email-without-at", USER_ERRORS, locale) },
                { f: emailFormatDomain, message: l("user/email-invalid-domain", USER_ERRORS, locale) },
              ],
            }
          },
          onSubmit: () => {
            // For multilanguage support: https://firebase.google.com/docs/auth/admin/email-action-links
            sendPasswordResetEmail(getAuth(), user.email).then(user.success).catch(({ code }) => user.fail(userErrorMessage(code === "auth/too-many-requests" ? code + "-reset" : code, locale))); }
        });

  useEffect(() => { if (router.isReady && err) user.fail(JSON.parse(window.atob(err))) },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]);

  return (
    <FocusLayout maxWidth="xs">
      <IProvider value={ACCOUNT_RESET}>
        { 
          user.isSuccess ? <>
            <Typography paragraph variant="h5"><I k="Reset link sent" width={300} /></Typography>
            <Alert severity="success" sx={{ mb: 3, mt: 1 }}><I arg={user.email} k="We've sent" lines={2} width={378} /></Alert>
          </> : <>
            <Typography paragraph variant="h5"><I dict={RESET} k="Reset your password." width={222} /></Typography>
            <Typography><I k="Send a password reset" width={364} /></Typography>
            <Form model={user} actions={<Submit><I k="Send reset link" width={120} /></Submit>}>
              <Field autoFocus label={<I dict={USER_FIELDS} k="email" width={80} />} name="email" type="email" />
            </Form>
          </>
        }
      </IProvider>
    </FocusLayout>
  )
}

export default AccountReset;
