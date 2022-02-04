import { useModal } from '@futo-ui/hooks'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

import { FeedLayout } from 'core/layouts'
import { NAMES } from 'core/locales'
import { PostCardLayout, PostDialog, PostFeed, usePostDialog } from 'post'
import { ProfileAvatar } from 'profile'
import { useAuth } from 'user'

/**
 * - Defines [`@mui/Dialog`](https://mui.com/api/dialog) for joining the platform if wanting to create a post and is not logged in. 
 * - Props of the [`@mui/Dialog`](https://mui.com/api/dialog) are also available.
 */
const PostJoinDialog = props => {
  return (
    <Dialog maxWidth="xs" {...props}>
      <DialogTitle>Share stories that matter.</DialogTitle>
      <DialogContent>
        {"Once you join "+NAMES.ccname+", you are going to be able to write posts."}
      </DialogContent>
      <DialogActions>
        <Button href="/join" variant="outlined">Join</Button>
        <Button href="/login">Log in</Button>
      </DialogActions>
    </Dialog>
  )
}

/**
 * - Shadow [`@mui/TextField`](https://mui.com/api/text-field) for prompting to creation of posts. 
 * - Opens either [`post/PostDialog`](/docs/post-postdialog--default) or [`post/PostJoinDialog`](/docs/post-postjoindialog--default) depending whether user is logged in or off.
 */
const PostPrompt = () => {
  const auth = useAuth(),
        joinDialog = useModal(false),
        [postDialog, post] = usePostDialog();
  
  const handleMouseDown = e => { e.preventDefault(); if (e.nativeEvent.which === 1) auth.isLoggedIn ? postDialog.open() : joinDialog.open(); }

  return (
    <>
      <PostCardLayout avatar={ auth.isLoggedIn && <ProfileAvatar /> } sx={{ mb: 2 }} title={
        <TextField inputProps={{ disabled: true }} margin="normal" onMouseDown={handleMouseDown} placeholder="What are you up to?" sx={{ flex: "auto", my: 2, '& > .MuiInput-root > input': { cursor: "pointer" } }} />}
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
