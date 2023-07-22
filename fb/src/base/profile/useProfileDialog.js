import { useDialog, useModel } from '@futo-ui/hooks'
import { base64, empty } from '@futo-ui/utils'
import { doc, getDocs, query, serverTimestamp, where } from 'firebase/firestore'

import { createBatch, upload } from 'core/fb'
import { Posts, Profiles, Stories } from 'core/fb/colls'
import { errorMessage } from 'core/utils'
import { l, useLocale } from 'core/utils/i18n'
import { presence } from 'core/validators'
import { AVATAR_IMAGE_TYPES } from 'profile/constants'
import { PROFILE_ERRORS } from 'profile/i18n'
import { useAuth } from 'user'

const useProfileDialog = initProfile => {
  const auth = useAuth(), locale = useLocale(),
        profile = useModel({ bio: "", displayName: "", photoURL: "" }, { validation: { syncValidators: { displayName: { f: presence, message: l("profile/displayname-empty", PROFILE_ERRORS, locale) } } },
        onSubmit: () => {
          /* TODO: UPDATE USERNAME (THROUGH BATCH / IF EVER NEEDED)
          const batch = createBatch(),
                newUsername = "dennisxx",
                profileId = "tDDrNXrBU4RF2x4XvfqjvdIsXvA3",
                oldUsername = "dennisxxx";

          batch.set(doc(Profiles, profileId), { displayName: "", photoURL: "", username: newUsername });
          batch.set(doc(Usernames, newUsername), { userId: auth.uid });
          batch.delete(doc(Usernames, oldUsername));
          batch.commit(); */
          const update = async ({ photoURL } = {}) => {
            const batch = createBatch(), bio = profile.bio || "", displayName = profile.displayName || "",
                  { displayName: oldDisplayName, initiallyChangedAt, photoURL: oldPhotoURL } = initProfile();
           
            batch.set(doc(Profiles, profile.id), { bio, displayName, ...(initiallyChangedAt ? {} : { initiallyChangedAt: serverTimestamp() }), ...(photoURL ? { photoURL } : {}) }, { merge: true });

            if ((empty(oldDisplayName) && empty(initiallyChangedAt) && empty(oldPhotoURL)) || (((empty(oldPhotoURL) && oldPhotoURL !== photoURL) || oldDisplayName !== displayName) && Date.now() < initiallyChangedAt + 24 * 3600 * 1000)) {
              const posts = await getDocs(query(Posts, where("profileId", "==", profile.id))),
                    stories = await getDocs(query(Stories, where("profileId", "==", profile.id)));

              posts.forEach(doc => batch.set(doc.ref, { profileDisplayName: displayName, ...(photoURL ? { profilePhotoURL: photoURL } : {}) }, { merge: true }));
              stories.forEach(doc => batch.set(doc.ref, { profileDisplayName: displayName, ...(photoURL ? { profilePhotoURL: photoURL } : {}) }, { merge: true })); }
            
            return batch.commit().then(dialog.close); 
          }

          if (base64(profile.photoURL, AVATAR_IMAGE_TYPES)) {
            upload(auth, "profiles/"+profile.id+"/original", profile.photoURL)
              .then(downloadURL => update({ photoURL: downloadURL }))
              .catch(err => profile.fail(errorMessage({ key: err.code, locale })));
          } else { update().catch(err => profile.fail(errorMessage({ key: err.code, locale }))); }
        }}),
        dialog = useDialog(profile, initProfile);

  return [dialog, profile];
}

export default useProfileDialog;
