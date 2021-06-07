import { useMenu } from '@futo-ui/hooks'
import { Link, ListItemIcon, ListItemText, MenuItem, Skeleton, Typography } from '@material-ui/core'
import { DeleteOutlined, EditOutlined, MoreHoriz } from '@material-ui/icons'

import { IconButton, Menu } from 'core'
import { PostCardLayout, Posts } from 'post'
import { ProfileAvatar } from 'profile'
import { useAuth } from 'user'

const PostCard = ({ post, onEdit }) => {
  const auth = useAuth(),
        menu = useMenu();

  const handleEdit = e => { menu.close(); onEdit(e); }
  const handleRemove = () => { menu.close(); Posts.doc(post.id).delete(); }

  return (
    <PostCardLayout
      action={
        auth.isLoggedIn && post?.profileId === auth.uid && <>
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
      avatar={
        post ?
          <Link href={"/" + post?.profileUsername} underline="none"><ProfileAvatar src={post?.profilePhotoURL} /></Link>
          :
          <ProfileAvatar ready={false} />
      }
      title={
        post ?
          <><Link href={"/" + post.profileUsername}>{post.profileDisplayName || "@" + post.profileUsername}</Link>{" · "+post.time}</>
          :
          <Skeleton width={160} />
      }>
      <Typography variant="body1" color="textPrimary" component="p" style={{ whiteSpace: 'pre-wrap' }}>{post ? post.content : <Skeleton />}</Typography>
    </PostCardLayout>
  )
}

export default PostCard;
