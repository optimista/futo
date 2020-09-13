import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  grid: { minHeight: "100vh" }
}));

const FocusLayout = ({ children, maxWidth }) => {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth={maxWidth}>
        <Grid className={classes.grid} container alignItems="center" justify="center">
          <Grid item xs={12}>{children}</Grid>
        </Grid>
      </Container>
    </>
  )
}

export default FocusLayout
