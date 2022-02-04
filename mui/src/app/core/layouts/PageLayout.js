import { Container } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * - Allows empty children and sets vertical padding.
 * - Extends [`@mui/Container`](https://mui.com/api/container)
 */
const PageLayout = ({ children, sx, ...props }) => {
  return (
    <Container sx={{ py: 4, ...sx }} {...props}>
      {children || <></>}
    </Container>
  )
}

PageLayout.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  
  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'lg'
   */
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
  
  /**
   * The @mui system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default PageLayout;
