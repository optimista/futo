import { TextField } from '@material-ui/core'

const LoginFields = ({ user }) => (
  <>
    <TextField autoFocus fullWidth error={Boolean(user.errors.email)} helperText={user.errors.email || "Email"} onChange={user.handleChange('email')} value={user.email} type="email" />
    <TextField fullWidth error={Boolean(user.errors.password)} helperText={user.errors.password || "Password"} onChange={user.handleChange('password')} value={user.password} type="password" />
  </>
)

export default LoginFields;
