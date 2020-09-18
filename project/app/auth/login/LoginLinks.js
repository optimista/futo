import { Box, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: { borderTop: "1px dashed "+theme.palette.divider }
}));

const LoginLinks = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root} align="center" my={1} pt={2}>
      <Link color="textSecondary" href="/account/reset">Forgot your password?</Link>
    </Box>
  )
}

export default LoginLinks;
