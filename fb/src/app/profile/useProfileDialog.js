import { useDialog, useModel } from '@futo-ui/hooks'
import { base64 } from '@futo-ui/utils'

import { errorMessage, upload } from 'core/utils'
import { presence } from 'core/validators'
import { Profiles } from 'profile'
import { AVATAR_IMAGE_TYPES } from 'profile/constants'
import { PROFILE_ERRORS } from 'profile/locales'

const useProfileDialog = initProfile => {
  const profile = useModel({ bio: "", displayName: "", photoURL: "" }, { validation: { syncValidators: { displayName: { f: presence, message: PROFILE_ERRORS["profile/displayname-empty"] } } }, onSubmit: () => {

        /* TODO: UPDATE USERNAME (THROUGH BATCH / IF EVER NEEDED)
        const batch = firebase.firestore().batch(),
              newUsername = "dennisxx",
              profileId = "tDDrNXrBU4RF2x4XvfqjvdIsXvA3",
              oldUsername = "dennisxxx";

        batch.set(Profiles.doc(profileId), { displayName: "", photoURL: "", username: newUsername });
        batch.set(Usernames.doc(newUsername), { userId: auth.uid });
        batch.delete(Usernames.doc(oldUsername));
        batch.commit(); */
        const update = data => Profiles.doc(profile.id).update({ bio: profile.bio || "", displayName: profile.displayName || "", ...data }).then(dialog.close);

        if (base64(profile.photoURL, AVATAR_IMAGE_TYPES)) {
          upload("profiles/"+profile.id+"/original", profile.photoURL)
            .then(downloadURL => update({ photoURL: downloadURL }))
            .catch(err => profile.fail(errorMessage(err)));
        } else { update().catch(err => profile.fail(errorMessage(err))); }
      }}),
      dialog = useDialog(profile, initProfile);

  return [dialog, profile];
}

export default useProfileDialog;
