import { useModal } from '@futo-ui/hooks'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

import { FeedLayout } from 'core/layouts'
import { GENERAL, NAMES } from 'core/i18n'
import { I, IProvider, l, useLocale } from 'core/utils/i18n'
import { PostCardLayout, PostDialog, PostFeed, usePostDialog } from 'post'
import { PROMPT } from 'post/i18n'
import { ProfileAvatar } from 'profile'
import { useAuth } from 'user'

const POST_JOIN_DIALOG = {
  "en": {
    "Once you join": "Once you join "+NAMES.ccname+", you are going to be able to write posts.",
    "Share stories that matter.": "Share stories that matter."
  },
  "es": {
    "Once you join": "Una vez que se una a "+NAMES.ccname+", podrá escribir publicaciones.",
    "Share stories that matter.": "Comparte historias que importan."
  }
}

/**
 * - Defines [`@mui/Dialog`](https://mui.com/api/dialog) for joining the platform if wanting to create a post and is not logged in. 
 * - Props of the [`@mui/Dialog`](https://mui.com/api/dialog) are also available.
 */
const PostJoinDialog = props => {
  return (
    <IProvider value={POST_JOIN_DIALOG}>
      <Dialog maxWidth="xs" {...props}>
        <DialogTitle><I k="Share stories that matter." width={266} /></DialogTitle>
        <DialogContent><I k="Once you join" lines={2} /></DialogContent>
        <DialogActions>
          <Button href="/join" variant="outlined"><I dict={GENERAL} k="Join" width={60} /></Button>
          <Button href="/login"><I dict={GENERAL} k="Login" width={60} /></Button>
        </DialogActions>
      </Dialog>
    </IProvider>
  )
}

/**
 * - Shadow [`@mui/TextField`](https://mui.com/api/text-field) for prompting to creation of posts. 
 * - Opens either [`post/PostDialog`](/docs/post-postdialog--default) or [`post/PostJoinDialog`](/docs/post-postjoindialog--default) depending whether user is logged in or off.
 */
const PostPrompt = () => {
  const auth = useAuth(), locale = useLocale(), joinDialog = useModal(false), [postDialog, post] = usePostDialog();
  
  const handleMouseDown = e => { e.preventDefault(); if (e.nativeEvent.which === 1) auth.isLoggedIn ? postDialog.open() : joinDialog.open(); }

  return (
    <>
      <PostCardLayout avatar={ auth.isLoggedIn && <ProfileAvatar /> } sx={{ mb: 2 }} title={
        <TextField inputProps={{ disabled: true }} margin="normal" onMouseDown={handleMouseDown} placeholder={l("prompt", PROMPT, locale)} sx={{ flex: "auto", my: 2, '& > .MuiInput-root > input': { cursor: "pointer" } }} />}
        />
      <PostDialog post={post} open={postDialog.isOpen} onClose={postDialog.close} />      
      <PostJoinDialog open={joinDialog.isOpen} onClose={joinDialog.close} /> 
    </>
  )
}

const Home = () => 
  <FeedLayout>
    <PostPrompt />
    <PostFeed />
  </FeedLayout>

export { Home as default, PostJoinDialog, PostPrompt };
