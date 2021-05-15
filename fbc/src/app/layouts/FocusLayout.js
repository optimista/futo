import { Container, Grid } from '@material-ui/core'

const FocusLayout = ({ children, maxWidth }) =>
  <Container maxWidth={maxWidth}>
    <Grid container sx={{ alignItems: "center", minHeight: "100vh" }}>
      <Grid item xs={12}>{children}</Grid>
    </Grid>
  </Container>

export default FocusLayout;
