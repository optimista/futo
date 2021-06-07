import { useDialog, useModel } from '@futo-ui/hooks'
import { base64 } from '@futo-ui/utils'
import { v4 } from 'uuid'

import { ImageField } from 'core/form'
import { errorMessage, firebase } from 'core/utils'
import { presence } from 'core/validators'
import { Profiles } from 'profile'
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

        if (base64(profile.photoURL, ImageField.MIME_TYPES)) {
          const ref = firebase.storage().ref("profiles/"+profile.id).child(v4()),
                upload = ref.putString(profile.photoURL, "data_url");

          upload.on("state_changed",
            () => {}, // TODO: snapshot => console.log(snapshot.bytesTransferred / snapshot.totalBytes),
            err => profile.fail(errorMessage(err)),
            () => upload.snapshot.ref.getDownloadURL().then(downloadURL => update({ photoURL: downloadURL }).catch(err => {
              ref.delete(); profile.fail(errorMessage(err)); 
            }))
          );
        } else { update().catch(err => profile.fail(errorMessage(err))); }
      }}),
      dialog = useDialog(profile, initProfile);

  return [dialog, profile];
}

export default useProfileDialog;
