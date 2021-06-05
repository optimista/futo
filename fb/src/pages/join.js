import { useModel } from '@futo-ui/hooks'
import { Link, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

import { Field, Form, Submit } from 'core/form'
import { FocusLayout } from 'layouts'
import { ERRORS } from 'locales'
import { Profiles, Usernames } from 'models/profile'
import { firebase, firebaseError } from 'utils'
import { emailFormatAt, emailFormatDomain, emailUniqueness, maxLength, minLength, presence, usernameFormatCharacters, usernameFormatNoConsecutive, usernameFormatNoBeginEnd, usernameUniqueness } from 'utils/validators'

const JoinForm = () => {
  const router = useRouter(), 
        user = useModel({ email: "", password: "", username: "" }, {
          validation: {
            generalError: err => firebaseError(err, ERRORS["title/registration-not-successful"]),
            asyncValidators: {
              email: { f: emailUniqueness, message: ERRORS["auth/email-already-in-use"] },
              username: { f: usernameUniqueness, message: ERRORS["futo/username-exists"] }
            },
            syncValidators: {
              email: [
                { f: presence, message: ERRORS["futo/email-empty"] },
                { f: emailFormatAt, message: ERRORS["futo/email-without-at"] },
                { f: emailFormatDomain, message: ERRORS["futo/email-invalid-domain"] },
              ],
              password: { f: minLength(6), message: ERRORS["futo/password-short"] },
              username: [
                { f: presence, message: ERRORS["futo/username-empty"] },
                { f: maxLength(16), message: ERRORS["futo/username-long"] },
                { f: usernameFormatCharacters, message: ERRORS["futo/username-characters"] },
                { f: usernameFormatNoConsecutive, message: ERRORS["futo/username-consecutive"] },
                { f: usernameFormatNoBeginEnd, message: ERRORS["futo/username-begin-end"] },
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
                user.fail(firebaseError({}, ERRORS["title/registration-not-successful"]));
                firebase.auth().currentUser.delete();
              });
            }, err => user.fail(firebaseError(err)));
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
