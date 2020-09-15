import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'

import { LoginActions, LoginFields, LoginTitle, useLoginForm } from 'auth'

const LoginDialog = props => {
  const [form, user] = useLoginForm({ callback: props.onClose });

  return (
    <Dialog PaperProps={{ component: "form", onSubmit: form.handleSubmit }} {...props}>
      <DialogTitle>
        <LoginTitle />
      </DialogTitle>
      <DialogContent >
        <LoginFields user={user} />
      </DialogContent>
      <DialogActions>
        <LoginActions submitting={form.submitting} />
      </DialogActions>
    </Dialog>
  )
}

export default LoginDialog;
