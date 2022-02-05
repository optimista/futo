import { useModal } from '@futo-ui/hooks'
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material'
import PropTypes from 'prop-types'

import { Field, Form, Submit } from 'core/form'
import { PostCardLayout } from 'post'
import { ProfileAvatar } from 'profile'

/**
 * - Shown when user is about to discard their edits.
 * - Props of the [`@mui/Dialog`](https://mui.com/api/dialog) are also available.
 */
const DiscardDialog = ({ onClose, onDiscard, title = "Discard the edited changes?", ...props }) => 
  <Dialog fullWidth={false} maxWidth="xs" onClose={onClose} {...props}>
    <DialogTitle sx={{ typography: "h6" }}>{title}</DialogTitle>
    <DialogActions>
      <Button onClick={onClose} variant="outlined">Cancel</Button>
      <Button onClick={onDiscard}>Discard</Button>
    </DialogActions>
  </Dialog>

DiscardDialog.propTypes = {
  /**
   * Callback fired when the [`@mui/Dialog`](https://mui.com/api/dialog) requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: PropTypes.func,
  
  /**
   * Callback fired when the user requests to discard the changes. 
   */
  onDiscard: PropTypes.func,
  
  /**
   * The title of the dialog modal.
   * @default "Discard the edited changes?"
   */
  title: PropTypes.string,
};

/**
 * - Dialog to create or edit a post. 
 * - Props of the [`@mui/Dialog`](https://mui.com/api/dialog) are also available.
 */
const PostDialog = ({ post, onClose = () => {}, ...props }) => {
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
            <PostCardLayout avatar={<ProfileAvatar />} sx={{ '& > .MuiCardHeader-root > .MuiCardHeader-avatar': { alignSelf: "flex-start" } }} title={
              <Field name="content" autoFocus helperText="" label="" margin="none" multiline placeholder="What are you up to?" maxRows={7} />
            }/>
          </Form>
      </Dialog>
      <DiscardDialog onDiscard={handleDiscard} title={!post.id ? "Discard the new post?" : undefined} onClose={discard.close} open={discard.isOpen} />
    </>
  )
}

PostDialog.propTypes = {
  /**
   * Callback fired when the [`@mui/Dialog`](https://mui.com/api/dialog) requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: PropTypes.func,
  
  /**
   * Post `@futo-ui/hooks/useModel` model instance / object.
   */
  post: PropTypes.object,
};

export { PostDialog as default, DiscardDialog }
