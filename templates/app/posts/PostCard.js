import { useMenu } from '@futo-ui/hooks'
import { Avatar, Card, CardHeader, CardContent, IconButton, MenuItem, Typography } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

import { Menu } from 'core'
import { Posts } from 'data'

const PostCard = ({ post, onEdit }) => {
  const [anchorEl, isOpen, handleOpen, handleClose] = useMenu();

  function handleEdit(e) { handleClose(); onEdit(e); }
  function handleRemove() { handleClose(); Posts.delete(post.id); }

  return (
    <>
      <Card>
        <CardHeader
          action={<IconButton aria-controls="menu-postcard" aria-label="settings" color="secondary" onClick={handleOpen}><ExpandMore /></IconButton>}
          avatar={<Avatar aria-label="recipe">G</Avatar>}
          title={"Guest · "+post.time}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" style={{ whiteSpace: 'pre-wrap' }}>{post.content}</Typography>
        </CardContent>
      </Card>
      <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleRemove}>Remove</MenuItem>
      </Menu>
    </>
  )
}

export default PostCard;
