import { useModel } from '@futo-ui/hooks'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { deleteField, doc, getDoc, getDocs, query, where, writeBatch } from 'firebase/firestore'

import { db } from 'core/utils'
import { useLocale } from 'core/utils/i18n'
import { Profiles } from 'profile'
import { Stories } from 'story'
import { userErrorMessage } from 'user'

const useLoginModel = ({ onSuccess = () => {} } = { onSuccess: () => {} }) => {
  const locale = useLocale(), user = useModel({ email: "", password: "" }, {
          onSubmit: () => { const auth = getAuth(); signInWithEmailAndPassword(auth, user.email, user.password)
              .then(() => {
                const auid = window.localStorage.getItem("auid");
                return auid ? getDoc(doc(Profiles, auth.currentUser.uid)).then(async (snapshot) => {
                  const { displayName, photoURL, username } = snapshot.data(), batch = writeBatch(db()), ls = window.localStorage,
                        stories = await getDocs(query(Stories, where("profileId", "==", auid)));
                 
                  ls.removeItem("auid"); ls.removeItem("ascount"),
                  stories.forEach(doc => batch.set(doc.ref, { isAnonymous: deleteField(), profileId: auth.currentUser.uid, profileDisplayName: displayName, profilePhotoURL: photoURL, profileUsername: username }, { merge: true }));
                  return batch.commit();
                }) : Promise.resolve();
              }).then(onSuccess).catch(err => user.fail(userErrorMessage(err.code + (err.code === "auth/wrong-password" ? "-login" : ""), locale)));
        }});

  return user;
}

export default useLoginModel;
