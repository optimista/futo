import { useModal } from '@futo-ui/hooks'
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@material-ui/core'

import { Field, Form, Submit } from 'core/form'
import { PostCardLayout } from 'models/post'
import { Avatar } from 'models/profile'

const DiscardDialog = ({ onClose, onDiscard, title, ...props }) => 
  <Dialog fullWidth={false} maxWidth="xs" onClose={onClose} {...props}>
    <DialogTitle>
      <Typography variant="h6">{title || "Discard the edited changes?"}</Typography>
    </DialogTitle>
    <DialogActions>
      <Button onClick={onClose} variant="outlined">Cancel</Button>
      <Button onClick={onDiscard}>Discard</Button>
    </DialogActions>
  </Dialog>

const PostDialog = ({ post, onClose, ...props }) => {
  // Discard dialog functionality
  const discard = useModal(false),
        handleClose = () => post.isChanged ? discard.open() : onClose(),
        handleDiscard = () => { onClose(); discard.close(); };

  // How to reuse this discard pattern?
  // 1. Create useModalWithDiscard
  // 2. Put it in usePostDialog instead of useModal
  // 3. You probably want to either have DiscardDialog outside of PostDialog or pass additional prop `discardModal` to PostDialog
  // 4. You can set the condition `post.isChanged?` as argument to `useModalWithDiscard` through a function though (so we can access the last state)

  return (
    <>
      <Dialog maxWidth="sm" onClose={handleClose} {...props}>
        <Typography sx={{ ml: 2 }} variant="h5">{ post.id ? "Edit post" : "Create post" }</Typography>
          <Form model={post} actions={<>
            <Button onClick={onClose} variant="outlined">Cancel</Button>
            <Submit disabled={post.isInvalid} sx={{ mr: 2 }}>{ post.id ? "Save" : "Post" }</Submit>
          </>}>
            <PostCardLayout avatar={<Avatar />} sx={{ '& > .MuiCardHeader-root > .MuiCardHeader-avatar': { alignSelf: "flex-start" } }} title={
              <Field name="content" autoFocus helperText="" label="" margin="none" multiline placeholder="What are you up to?" maxRows={7} />
            }/>
          </Form>
      </Dialog>
      <DiscardDialog onDiscard={handleDiscard} title={!post.id && "Discard the new post?"} onClose={discard.close} open={discard.isOpen} />
    </>
  )
}

export default PostDialog
