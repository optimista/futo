import { useDialog, useModel } from '@futo-ui/hooks'
import { base64 } from '@futo-ui/utils'
import { v4 } from 'uuid'

import { ImageField } from 'core/form'
import { ERRORS } from 'locales'
import { Profiles } from 'models/profile'
import { firebase, firebaseError } from 'utils'
import { presence } from 'utils/validators'

const useProfileDialog = initProfile => {
  const profile = useModel({ bio: "", displayName: "", photoURL: "" }, { validation: { syncValidators: { displayName: { f: presence, message: ERRORS["futo/displayname-empty"] } } }, onSubmit: () => {

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
            err => profile.fail(firebaseError(err)),
            () => upload.snapshot.ref.getDownloadURL().then(downloadURL => update({ photoURL: downloadURL }).catch(err => {
              ref.delete(); profile.fail(firebaseError(err)); 
            }))
          );
        } else { update().catch(err => profile.fail(firebaseError(err))); }
      }}),
      dialog = useDialog(profile, initProfile);

  return [dialog, profile];
}

export default useProfileDialog;
