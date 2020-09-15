import { Button, CircularProgress } from '@material-ui/core'

const Submit = ({ children, progress, ...props }) => <Button type="submit" {...props}>{ progress ? <CircularProgress /> : children }</Button>

export default Submit;
