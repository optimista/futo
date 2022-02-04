import { useMenu } from '@futo-ui/hooks'
import { DeleteOutlined, EditOutlined, MoreHoriz } from '@mui/icons-material'
import { Link, ListItemIcon, ListItemText, MenuItem, Skeleton, Typography } from '@mui/material'
import { deleteDoc, doc } from 'firebase/firestore'
import PropTypes from 'prop-types'

import { Feed, IconButton, Menu } from 'core'
import { PostCardLayout, PostDialog, Posts, usePostDialog } from 'post'
import { ProfileAvatar } from 'profile'
import { useAuth } from 'user'

/**
 * - Shows post as a [`@mui/Card`](https://mui.com/api/card) within the [`core/Feed`](/docs/core-feed--default). 
 */
const PostCard = ({ post, onEdit }) => {
  const auth = useAuth(), menu = useMenu();

  const handleEdit = e => { menu.close(); onEdit(e); }
  const handleRemove = () => { menu.close(); deleteDoc(doc(Posts, post.id)); }

  return (
    <PostCardLayout
      action={
        auth.isLoggedIn && post?.profileId === auth.uid && <>
          <IconButton color="secondary" onClick={menu.open} TooltipProps={{ hide: menu.isOpen, title: "More" }}>
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

PostCard.propTypes = {
  /**
   * The post object as fetched from the database. 
   */
  post: PropTypes.object,

  /**
   * Callback executed when user clicks on the option of editing the post. 
   */
  onEdit: PropTypes.func,
};

/**
 * - Defines [`core/Feed`](/docs/core-feed--default) for posts.
 * - Includes [`post/PostDialog`](/docs/post-postdialog--default) 
 * - Props of the [`core/Feed`](/docs/core-feed--default) are also available.
 */
const PostFeed = props => {
  const [postDialog, post] = usePostDialog(),
        handleEdit = post => () => postDialog.open(post);

  return (
    <>
      <Feed collection={Posts} Item={({ item, ...props }) => <PostCard onEdit={handleEdit(item)} post={item} {...props} />}
            sx={{ maxWidth: 600, minWidth: 400 }} {...props} />
      <PostDialog post={post} open={postDialog.isOpen} onClose={postDialog.close} /> 
    </>
  )
}

export { PostFeed as default, PostCard };
