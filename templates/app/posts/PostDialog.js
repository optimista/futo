import { useForm, useModel } from '@futo-ui/hooks'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Close } from '@material-ui/icons'

import { Submit } from 'core'
import { Posts } from 'data'

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: "absolute",
    right: 24,
    top: 24
  }
}));

const PostDialog = ({ post, onClose, ...props }) => {
  const form = useForm({
    action: () => { const { content } = post; if (content !== "") { return post.id ? Posts.update(post.id, { content }) : Posts.create({ content }); }; },
    callback: onClose
  });

  function handleKeyDown(e) { if (e.shiftKey && e.key === 'Enter') form.handleSubmit(e); } 

  const classes = useStyles();
  return (
    <Dialog maxWidth="sm" PaperProps={{ component: "form", onSubmit: form.handleSubmit }} onClose={onClose} {...props}>
      <DialogTitle>
        <Typography variant="h5">{ post.id ? "Edit post" : "Create post" }</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField autoFocus fullWidth margin="none" multiline onChange={post.handleChange('content')} onKeyDown={handleKeyDown} placeholder="What are you up to?" rowsMax={7} value={post.content}></TextField>
      </DialogContent>
      <DialogActions>
        <Submit disabled={post.content === ""} progress={form.submitting}>{ post.id ? "Save" : "Post" }</Submit>
      </DialogActions>
      <IconButton aria-label="Close" className={classes.closeButton} color="secondary" onClick={onClose}>
        <Close />
      </IconButton>
    </Dialog>
  )
}

export default PostDialog
