import { useDialog, useModel } from '@futo-ui/hooks'
import { addDoc, doc, updateDoc } from 'firebase/firestore'

import { errorMessage } from 'core/utils'
import { presence } from 'core/validators'
import { Posts } from 'post'
import { useAuth } from 'user'

const usePostDialog = () => {
  const auth = useAuth(),
        post = useModel({ content: "" }, { validation: { silentValidators: { content: presence } }, onSubmit: () => {
          const { content } = post;
          (post.id ? updateDoc(doc(Posts, post.id), { content }) : addDoc(Posts, { content, profileDisplayName: auth.profile.displayName, profileId: auth.profile.id, profilePhotoURL: auth.profile.photoURL, profileUsername: auth.profile.username })).then(() => { dialog.close(); post.success(); }, err => post.fail(errorMessage(err)));
        }}),
        dialog = useDialog(post);

  return [dialog, post];
}

export default usePostDialog;
