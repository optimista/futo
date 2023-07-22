import { useModel } from '@futo-ui/hooks'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { deleteField, doc, getDoc } from 'firebase/firestore'

import { createBatch, getDocsWhereIn } from 'core/fb'
import { Profiles, Stories } from 'core/fb/colls'
import { useLocale } from 'core/utils/i18n'
import { userErrorMessage } from 'user'

const useLoginModel = ({ onSuccess = () => {} } = { onSuccess: () => {} }) => {
  const locale = useLocale(), user = useModel({ email: "", password: "" }, {
          onSubmit: () => { 
            const auth = getAuth(), anonymousUser = auth.currentUser, auids = JSON.parse(window.localStorage.getItem("auids"));
            (auids ? anonymousUser.delete() : Promise.resolve()).then(() => signInWithEmailAndPassword(auth, user.email, user.password)).then(() => {
              return auids ? getDoc(doc(Profiles, auth.currentUser.uid)).then(async (snapshot) => {
                const { displayName, photoURL, username } = snapshot.data(), batch = createBatch(), ls = window.localStorage, stories = await getDocsWhereIn(Stories, "profileId", auids);
               
                ls.removeItem("auids"); ls.removeItem("ascount"),
                stories.forEach(doc => batch.set(doc.ref, { isAnonymous: deleteField(), profileId: auth.currentUser.uid, profileDisplayName: displayName, profilePhotoURL: photoURL, profileUsername: username }, { merge: true }));
                return batch.commit().then(() => ({ ...auth.currentUser, profile: { displayName, photoURL, username } }));
              }) : Promise.resolve()})
            .then(onSuccess).catch(err => user.fail(userErrorMessage(err.code + (err.code === "auth/wrong-password" ? "-login" : ""), locale)));
        }});

  return user;
}

export default useLoginModel;
