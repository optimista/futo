import { Box, Link, Typography } from '@mui/material'
import PropTypes from 'prop-types'

import { Field, Form, Submit } from 'core/form'
import { GENERAL } from 'core/i18n'
import { I, IProvider } from 'core/utils/i18n'
import { USER_FIELDS } from 'user/i18n'

const LOGIN_FORM = {
  "en": {
    "Return to your stories.": "Return to your stories.",
    "Log into your account.": "Log into your account.",
    "Don't have an account yet?": "Don't have an account yet?",
    "Forgot your password?": "Forgot your password?",
  },
  "es": {
    "Return to your stories.": "Vuelve a tus historias.",
    "Log into your account.": "Inicia sesión en tu cuenta.",
    "Don't have an account yet?": "¿Aún no tienes una cuenta?",
    "Forgot your password?": "¿Olvidaste tu contraseña?",
  }
}

/**
 * - Defines [`core/form/Form`](/docs/core-form-form--default) for logging in. 
 */
const LoginForm = ({ user }) =>
  <IProvider value={LOGIN_FORM}>
    <Typography variant="h5"><I k="Return to your stories." width={233} /></Typography>
    <Typography variant="h5"><I k="Log into your account." width={233} /></Typography>
    <Form model={user} actionsJustify="space-between" actions={<>
      <Link href="/join" variant="body2"><I k="Don't have an account yet?" width={161} /></Link>
      <Submit><I dict={GENERAL} k="Login" width={80} /></Submit>
    </>}>
      <Field label={<I dict={USER_FIELDS} k="email" width={80} />} name="email" type="email" autoFocus />
      <Field label={<I dict={USER_FIELDS} k="password" width={80} />} name="password" type="password" />
    </Form>
    <Box sx={{ borderTop: theme => "1px dashed "+theme.palette.divider, mt: 4, pt: 3, textAlign: "center" }}>
      <Link color="textSecondary" href="/account/reset" variant="body2"><I k="Forgot your password?" sx={{ display: "inline-block" }} width={146} /></Link>
    </Box>
  </IProvider>

LoginForm.propTypes = {
  /**
   * User `@futo-ui/hooks/useModel` model instance / object.
   */
  user: PropTypes.object.isRequired,
};

export default LoginForm;
