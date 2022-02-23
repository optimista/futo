import { useModal } from '@futo-ui/hooks'
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material'
import PropTypes from 'prop-types'

import { Field, Form, Submit } from 'core/form'
import { ACTIONS } from 'core/i18n' 
import { I, IProvider, l, useLocale } from 'core/utils/i18n'
import { PostCardLayout } from 'post'
import { POST_ACTIONS, PROMPT } from 'post/i18n'
import { ProfileAvatar } from 'profile'

const COMMONS = {
  "en": {
    "Cancel": "Cancel",
  },
  "es": {
    "Cancel": "Cancelar",
  }
};

const DISCARD_DIALOG = {
  "en": {
    "Discard Changes": "Discard the edited changes?",
    "Discard": "Discard",
  },
  "es": {
    "Discard Changes": "¿Descartar los cambios editados?",
    "Discard": "Descartar",
  }
}

/**
 * - Shown when user is about to discard their edits.
 * - Props of the [`@mui/Dialog`]("https://mui.com/api/dialog) are also available.
 */
const DiscardDialog = ({ onClose, onDiscard, title, ...props }) => 
  <IProvider value={DISCARD_DIALOG}>
    <Dialog fullWidth={false} maxWidth="xs" onClose={onClose} {...props}>
      <DialogTitle sx={{ typography: "h6" }}>{title || <I k="Discard Changes" width={200} />}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} variant="outlined"><I dict={COMMONS} k="Cancel" width={60} /></Button>
        <Button onClick={onDiscard}><I k="Discard" width={60} /></Button>
      </DialogActions>
    </Dialog>
  </IProvider>

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
   */
  title: PropTypes.node,
};

const POST_DIALOG = {
  "en": {
    "Discard Post": "Discard the new post?",
    "Create post": "Create post",
    "Post": "Post",
  },
  "es": {
    "Discard Post": "¿Descartar la nueva publicación?",
    "Create post": "Crear publicación",
    "Post": "Publicar",
  }
}

/**
 * - Dialog to create or edit a post. 
 * - Props of the [`@mui/Dialog`](https://mui.com/api/dialog) are also available.
 */
const PostDialog = ({ post, onClose = () => {}, ...props }) => {
  // Discard dialog functionality
  const discard = useModal(false), locale = useLocale(),
        handleClose = () => post.isChanged ? discard.open() : onClose(),
        handleDiscard = () => { onClose(); discard.close(); };

  // How to reuse this discard pattern?
  // 1. Create useModalWithDiscard
  // 2. Put it in usePostDialog instead of useModal
  // 3. You probably want to either have DiscardDialog outside of PostDialog or pass additional prop `discardModal` to PostDialog
  // 4. You can set the condition `post.isChanged?` as argument to `useModalWithDiscard` through a function though (so we can access the last state)

  return (
    <IProvider value={POST_DIALOG}>
      <Dialog maxWidth="sm" onClose={handleClose} {...props}>
        <Typography sx={{ ml: 2 }} variant="h5">{post.id ? <I dict={POST_ACTIONS} k="Edit post" width={120} /> : <I k="Create post" width={120} />}</Typography>
          <Form model={post} actions={<>
            <Button onClick={onClose} variant="outlined"><I dict={COMMONS} k="Cancel" width={60} /></Button>
            <Submit disabled={post.isInvalid} sx={{ mr: 2 }}>{post.id ? <I dict={ACTIONS} k="Save" width={60} /> : <I k="Post" width={60} />}</Submit>
          </>}>
            <PostCardLayout avatar={<ProfileAvatar />} sx={{ '& > .MuiCardHeader-root > .MuiCardHeader-avatar': { alignSelf: "flex-start" } }} title={
              <Field name="content" autoFocus helperText="" label="" margin="none" multiline placeholder={l("prompt", PROMPT, locale)} maxRows={7} />
            }/>
          </Form>
      </Dialog>
      <DiscardDialog onDiscard={handleDiscard} title={!post.id && <I k="Discard Post" value={200} />} onClose={discard.close} open={discard.isOpen} />
    </IProvider>
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
