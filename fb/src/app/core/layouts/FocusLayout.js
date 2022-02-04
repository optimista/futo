import { Container, Grid } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * - Centers its content both horizontally and vertically. 
 */
const FocusLayout = ({ children, maxWidth }) =>
  <Container maxWidth={maxWidth}>
    <Grid container sx={{ alignItems: "center", minHeight: "100vh" }}>
      <Grid item xs={12}>{children}</Grid>
    </Grid>
  </Container>

FocusLayout.propTypes = {
  /**
   * The centered contents of the [`core/layouts/FocusLayout`](/docs/core-layouts-focuslayout--default).
   */
  children: PropTypes.node,

  /**
   * Determines the max-width of the contents inside [`core/layouts/FocusLayout`](/docs/core-layouts-focuslayout--default).
   * @default 'lg'
   */
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
};

export default FocusLayout;
