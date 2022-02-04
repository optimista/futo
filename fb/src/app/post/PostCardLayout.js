import { Card, CardContent, CardHeader } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * - Styles convenient layout for the [`@mui/Card`](https://mui.com/api/card) of the post. 
 * - Props of the [`@mui/Card`](https://mui.com/api/card) component are also available.
 */
const PostCardLayout = ({ action, avatar, children, sx, title }) => {
  return (
    <>
      <Card sx={{ border: 0, ...sx }}>
        <CardHeader action={action} avatar={avatar} title={title} />
        { children && <CardContent sx={{ pl: 9, pt: 0 }}>{children}</CardContent> }
      </Card>
    </>
  )
}

PostCardLayout.propTypes = {
  /**
   * The action to display in the [`@mui/CardHeader`](https://mui.com/api/card-header). 
   */
  action: PropTypes.node,
  
  /**
   * The [`core/Avatar`](/docs/core-avatar--default) element to display.
   */
  avatar: PropTypes.node,
  
  /**
   * The content of the [`@mui/Card`](https://mui.com/api/card).
   */
  children: PropTypes.node,
  
  /**
   * The @mui system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  
  /**
   * The title to display in the [`@mui/CardHeader`](https://mui.com/api/card-header). 
   */
  title: PropTypes.node,
};

export default PostCardLayout;
