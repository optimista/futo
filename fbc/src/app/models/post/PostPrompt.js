import { useModal } from '@futo-ui/hooks'
import { TextField } from '@material-ui/core'

import { useAuth } from 'auth'
import { Avatar } from 'core'
import { PostCardLayout, PostDialog, PostJoinDialog, usePostDialog } from 'models/post'

const PostPrompt = () => {
  const auth = useAuth(),
        joinDialog = useModal(false),
        [postDialog, post] = usePostDialog();
  
  const handleMouseDown = e => { e.preventDefault(); if (e.nativeEvent.which === 1) auth ? postDialog.open() : joinDialog.open(); }

  return (
    <>
      <PostCardLayout avatar={ auth && <Avatar /> } sx={{ mb: 2 }} title={
        <TextField inputProps={{ disabled: true }} margin="normal" onMouseDown={handleMouseDown} placeholder="What are you up to?" sx={{ flex: "auto", my: 2, '& > .MuiInput-root > input': { cursor: "pointer" } }} />}
        />
      <PostDialog post={post} open={postDialog.isOpen} onClose={postDialog.close} />      
      <PostJoinDialog open={joinDialog.isOpen} onClose={joinDialog.close} /> 
    </>
  )
}

export default PostPrompt;
