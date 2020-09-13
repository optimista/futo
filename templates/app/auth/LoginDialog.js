import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'

import { LoginActions, LoginFields, LoginTitle, useLoginForm } from 'auth'

const LoginDialog = props => {
  const [user, handleSubmit] = useLoginForm();

  function onSubmit(e) { handleSubmit(e, props.onClose); }

  return (
    <Dialog PaperProps={{ component: "form", onSubmit }} {...props}>
      <DialogTitle>
        <LoginTitle />
      </DialogTitle>
      <DialogContent >
        <LoginFields user={user} />
      </DialogContent>
      <DialogActions>
        <LoginActions />
      </DialogActions>
    </Dialog>
  )
}

export default LoginDialog;
