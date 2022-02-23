import { useModel } from '@futo-ui/hooks'
import { Link, Typography } from '@mui/material'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { doc, writeBatch } from 'firebase/firestore'
import { useRouter } from 'next/router'

import { Field, Form, Submit } from 'core/form'
import { FocusLayout } from 'core/layouts'
import { db, errorMessage } from 'core/utils'
import { I, IProvider, l, useLocale } from 'core/utils/i18n'
import { maxLength, minLength, presence } from 'core/validators'
import { Profiles, Usernames } from 'profile'
import { userErrorMessage } from 'user'
import { USER_ERRORS, USER_FIELDS } from 'user/i18n'
import { emailFormatAt, emailFormatDomain, emailUniqueness, usernameFormatCharacters, usernameFormatNoConsecutive, usernameFormatNoBeginEnd, usernameUniqueness } from 'user/validators'

const JOIN_FORM = {
  "en": {
    "Curate your stories.": "Curate your stories.",
    "Have a free account.": "Have a free account.",
    "Already registered?": "Already registered?",
    "Get started now": "Get started now",
    "username": "username"
  },
  "es": {
    "Curate your stories.": "Cura tus historias.",
    "Have a free account.": "Ten una cuenta gratis.",
    "Already registered?": "¿Ya registrado?",
    "Get started now": "Comience ahora",
    "username": "nombre de usuario"
  }
}

/**
 * - Defines [`core/form/Form`](/docs/core-form-form--default) for joining / registration. 
 */
const JoinForm = () => {
  const locale = useLocale(), router = useRouter(), 
        user = useModel({ email: "", password: "", username: "" }, {
          validation: {
            generalError: err => errorMessage({ key: err.code, locale, title: l("user/registration-not-successful/title", USER_ERRORS, locale) }),
            asyncValidators: {
              email: { f: emailUniqueness, message: l("auth/email-already-in-use", USER_ERRORS, locale) },
              username: { f: usernameUniqueness, message: l("user/username-exists", USER_ERRORS, locale) }
            },
            syncValidators: {
              email: [
                { f: presence, message: l("user/email-empty", USER_ERRORS, locale) },
                { f: emailFormatAt, message: l("user/email-without-at", USER_ERRORS, locale) },
                { f: emailFormatDomain, message: l("user/email-invalid-domain", USER_ERRORS, locale) },
              ],
              password: { f: minLength(6), message: l("user/password-short", USER_ERRORS, locale) },
              username: [
                { f: presence, message: l("user/username-empty", USER_ERRORS, locale) },
                { f: maxLength(16), message: l("user/username-long", USER_ERRORS, locale) },
                { f: usernameFormatCharacters, message: l("user/username-characters", USER_ERRORS, locale) },
                { f: usernameFormatNoConsecutive, message: l("user/username-consecutive", USER_ERRORS, locale) },
                { f: usernameFormatNoBeginEnd, message: l("user/username-begin-end", USER_ERRORS, locale) },
              ]
            },
          },
          onSubmit: () => {
            // Request!
            createUserWithEmailAndPassword(getAuth(), user.email, user.password).then(userCredential => {
              const batch = writeBatch(db()),
                    profileId = userCredential.user.uid;

              batch.set(doc(Profiles, profileId), { displayName: "", photoURL: "", username: user.username });
              batch.set(doc(Usernames, user.username), { profileId });
              
              batch.commit().then(() => {
                router.push("/")
              }).catch(() => { // Most likely: FirebaseError: [code=permission-denied]: Missing or insufficient permissions.
                user.fail(errorMessage({ title: l("user/registration-not-successful/title", USER_ERRORS, locale) }));
                getAuth().currentUser.delete();
              });
            }, err => user.fail(userErrorMessage(err.code, locale)));
          }
        });

  return (
    <IProvider value={JOIN_FORM}>
      <Typography variant="h5"><I k="Curate your stories." width={210} /></Typography>
      <Typography variant="h5"><I k="Have a free account." width={210} /></Typography>
      <Form actionsJustify="space-between" model={user} actions={<>
        <Link href="/login" variant="body2"><I k="Already registered?" width={130} /></Link>
        <Submit><I k="Get started now" width={120} /></Submit>
      </>}>
        <Field label={<I dict={USER_FIELDS} k="email" width={80} />} name="email" type="email" autoFocus />
        <Field label={<I dict={USER_FIELDS} k="password" width={80} />} name="password" type="password" />
        <Field label={<I k="username" width={80} />} name="username" inputProps={{ maxLength: 16 }} />
      </Form>
    </IProvider>
  );
}

const Join = () => {
  return (
    <FocusLayout maxWidth="xs">
      <JoinForm />
    </FocusLayout>
  );
}

export { Join as default, JoinForm };
