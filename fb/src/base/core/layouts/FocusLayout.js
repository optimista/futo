import { Container, Grid } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * - Centers its content both horizontally and vertically. 
 * - Props of the [`@mui/Container`](https://mui.com/api/container/) component are also available.
 */
const FocusLayout = ({ children, ...props }) =>
  <Container {...props}>
    <Grid container sx={{ alignItems: "center", minHeight: "100vh" }}>
      <Grid item xs={12}>{children}</Grid>
    </Grid>
  </Container>

FocusLayout.propTypes = {
  /**
   * The centered contents of the [`core/layouts/FocusLayout`](/docs/core-layouts-focuslayout--default).
   */
  children: PropTypes.node,
};

export default FocusLayout;
