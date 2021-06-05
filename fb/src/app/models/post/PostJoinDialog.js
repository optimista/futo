import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, Typography } from '@material-ui/core'

const PostJoinDialog = props => {
  return (
    <Dialog maxWidth="xs" {...props}>
      <DialogTitle>
        <Typography variant="h5">Share stories that matter.</Typography>
      </DialogTitle>
      <DialogContent>
        Once you join MyApp, you are going to be able to write posts.
      </DialogContent>
      <DialogActions>
        <Button component={Link} href="/join" variant="outlined">Join</Button>
        <Button component={Link} href="/login">Log in</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PostJoinDialog
