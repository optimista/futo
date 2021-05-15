import { useMenu } from '@futo-ui/hooks'
import { Link, ListItemIcon, ListItemText, MenuItem, Skeleton, Typography } from '@material-ui/core'
import { DeleteOutlined, EditOutlined, MoreHoriz } from '@material-ui/icons'

import { useAuth } from 'auth'
import { Avatar, IconButton, Menu } from 'core'
import { PostCardLayout, Posts } from 'models/post'

const PostCard = ({ post, onEdit }) => {
  const auth = useAuth(),
        menu = useMenu();

  function handleEdit(e) { menu.close(); onEdit(e); }
  function handleRemove() { menu.close(); Posts.doc(post.id).delete(); }

  return (
    <PostCardLayout
      action={
        auth && post?.profileId === auth.uid && <>
          <IconButton aria-controls="menu-postcard" aria-label="settings" color="secondary" onClick={menu.open} hideTooltip={menu.isOpen} tooltip="More">
            <MoreHoriz />
          </IconButton>
          <Menu anchorEl={menu.el} open={menu.isOpen} onClose={menu.close} placement="end">
            <MenuItem onClick={handleEdit}>
              <ListItemIcon>
                <EditOutlined />
              </ListItemIcon>
              <ListItemText primary="Edit post" />
            </MenuItem>
            <MenuItem onClick={handleRemove}>
              <ListItemIcon>
                <DeleteOutlined />
              </ListItemIcon>
              <ListItemText primary="Delete post" />
            </MenuItem>
          </Menu>
        </>
      }
      avatar={<Avatar href={"/" + post?.profileUsername} skeleton={!post} src={post?.profilePhotoURL} />}
      title={
        post ?
          <><Link href={"/" + post.profileUsername}>{post.profileDisplayName || "@" + post.profileUsername}</Link>{" · "+post.time}</>
          :
          <Skeleton width={80} />
      }>
      { post ? 
        <Typography variant="body1" color="textPrimary" component="p" style={{ whiteSpace: 'pre-wrap' }}>{post.content}</Typography>
        :
        <Skeleton height={60} variant="rectangular" />
      }
    </PostCardLayout>
  )
}

export default PostCard;
