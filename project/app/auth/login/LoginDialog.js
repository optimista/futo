import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'

import { LoginActions, LoginFields, LoginLinks, LoginTitle, useLoginForm } from 'auth/login'

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
        <LoginActions progress={form.isLoading} />
      </DialogActions>
      <Box mx={3}>
        <LoginLinks />
      </Box>
    </Dialog>
  )
}

export default LoginDialog;
