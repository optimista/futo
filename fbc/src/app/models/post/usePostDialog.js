import { useDialog, useModel } from '@futo-ui/hooks'

import { useAuth } from 'auth'
import { Posts } from 'models/post'
import { firebaseError } from 'utils'
import { presence } from 'utils/validators'

const usePostDialog = () => {
  const auth = useAuth(),
        post = useModel({ content: "" }, { validation: { silentValidators: { content: presence } }, onSubmit: () => {
          const { content } = post;
          (post.id ? Posts.doc(post.id).update({ content }) : Posts.add({ content, profileDisplayName: auth.profile.displayName, profileId: auth.profile.id, profilePhotoURL: auth.profile.photoURL, profileUsername: auth.profile.username })).then(() => { dialog.close(); post.success(); }, err => post.fail(firebaseError(err)));
        }}),
        dialog = useDialog(post);

  return [dialog, post];
}

export default usePostDialog;
