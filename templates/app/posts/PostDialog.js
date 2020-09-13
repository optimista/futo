import { useModel } from '@futo-ui/hooks'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Close } from '@material-ui/icons'

import { Posts } from 'data'

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: "absolute",
    right: 24,
    top: 24
  }
}));

const PostDialog = ({ post, onClose, ...props }) => {
  function handleKeyDown(e) { if (e.shiftKey && e.key === 'Enter') handleSubmit(e); } 

  function handleSubmit(e) {
    e.preventDefault(); const { content } = post;
    if (content !== "") {
      (post.id ? Posts.update(post.id, { content }) : Posts.create({ content })).then(() => onClose());
    }
  }

  const classes = useStyles();
  return (
    <Dialog maxWidth="sm" PaperProps={{ component: "form", onSubmit: handleSubmit }} onClose={onClose} {...props}>
      <DialogTitle>
        <Typography variant="h5">{ post.id ? "Edit post" : "Create post" }</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField autoFocus fullWidth margin="none" multiline onChange={post.handleChange('content')} onKeyDown={handleKeyDown} placeholder="What are you up to?" rowsMax={7} value={post.content}></TextField>
      </DialogContent>
      <DialogActions>
        <Button type="submit">{ post.id ? "Save" : "Post" }</Button>
      </DialogActions>
      <IconButton aria-label="Close" className={classes.closeButton} color="secondary" onClick={onClose}>
        <Close />
      </IconButton>
    </Dialog>
  )
}

export default PostDialog
