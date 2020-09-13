import { TextField } from '@material-ui/core'

const LoginFields = ({ user }) => (
  <>
    <TextField fullWidth helperText="Email"    onChange={user.handleChange('email')}    value={user.email}    type="email" />
    <TextField fullWidth helperText="Password" onChange={user.handleChange('password')} value={user.password} type="password" />
  </>
)

export default LoginFields;
