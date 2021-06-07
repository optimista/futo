import { useModel } from '@futo-ui/hooks'
import { Link, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

import { Field, Form, Submit } from 'core/form'
import { FocusLayout } from 'core/layouts'
import { errorMessage, firebase } from 'core/utils'
import { maxLength, minLength, presence } from 'core/validators'
import { Profiles, Usernames } from 'profile'
import { userErrorMessage } from 'user'
import { USER_ERRORS } from 'user/locales'
import { emailFormatAt, emailFormatDomain, emailUniqueness, usernameFormatCharacters, usernameFormatNoConsecutive, usernameFormatNoBeginEnd, usernameUniqueness } from 'user/validators'

const JoinForm = () => {
  const router = useRouter(), 
        user = useModel({ email: "", password: "", username: "" }, {
          validation: {
            generalError: err => errorMessage(err, USER_ERRORS["user/registration-not-successful/title"]),
            asyncValidators: {
              email: { f: emailUniqueness, message: USER_ERRORS["auth/email-already-in-use"] },
              username: { f: usernameUniqueness, message: USER_ERRORS["user/username-exists"] }
            },
            syncValidators: {
              email: [
                { f: presence, message: USER_ERRORS["user/email-empty"] },
                { f: emailFormatAt, message: USER_ERRORS["user/email-without-at"] },
                { f: emailFormatDomain, message: USER_ERRORS["user/email-invalid-domain"] },
              ],
              password: { f: minLength(6), message: USER_ERRORS["user/password-short"] },
              username: [
                { f: presence, message: USER_ERRORS["user/username-empty"] },
                { f: maxLength(16), message: USER_ERRORS["user/username-long"] },
                { f: usernameFormatCharacters, message: USER_ERRORS["user/username-characters"] },
                { f: usernameFormatNoConsecutive, message: USER_ERRORS["user/username-consecutive"] },
                { f: usernameFormatNoBeginEnd, message: USER_ERRORS["user/username-begin-end"] },
              ]
            },
          },
          onSubmit: () => {
            // Request!
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(userCredential => {
              const batch = firebase.firestore().batch(),
                    profileId = userCredential.user.uid;

              batch.set(Profiles.doc(profileId), { displayName: "", photoURL: "", username: user.username });
              batch.set(Usernames.doc(user.username), { profileId });
              
              batch.commit().then(() => {
                router.push("/")
              }).catch(() => { // Most likely: FirebaseError: [code=permission-denied]: Missing or insufficient permissions.
                user.fail(errorMessage({}, USER_ERRORS["user/registration-not-successful/title"]));
                firebase.auth().currentUser.delete();
              });
            }, err => user.fail(userErrorMessage(err)));
          }
        });

  return (
    <>
      <Typography variant="h5">Curate your stories.</Typography>
      <Typography variant="h5">Have a free account.</Typography>
      <Form actionsJustify="space-between" model={user} actions={<>
        <Link href="/login" variant="body2">Already registered?</Link>
        <Submit>Get started now</Submit>
      </>}>
        <Field name="email" type="email" autoFocus />
        <Field name="password" type="password" />
        <Field name="username" inputProps={{ maxLength: 16 }} />
      </Form>
    </>
  );
}

const Join = () => {
  return (
    <FocusLayout maxWidth="xs">
      <JoinForm />
    </FocusLayout>
  );
}

export default Join;
