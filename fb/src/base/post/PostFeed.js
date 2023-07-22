import { useMenu } from '@futo-ui/hooks'
import { DeleteOutlined, EditOutlined, MoreHoriz } from '@mui/icons-material'
import { Link, ListItemIcon, ListItemText, MenuItem, Skeleton, Typography } from '@mui/material'
import { deleteDoc, doc } from 'firebase/firestore'
import PropTypes from 'prop-types'

import { Feed, IconButton, Menu } from 'core'
import { Posts } from 'core/fb/colls'
import { GENERAL } from 'core/i18n'
import { I, l, useLocale } from 'core/utils/i18n'
import { PostCardLayout, PostDialog, usePostDialog } from 'post'
import { POST_ACTIONS } from 'post/i18n'
import { ProfileAvatar } from 'profile'
import { useAuth } from 'user'

const POST_CARD = {
  "en": {
    "Delete post": "Delete post",
  },
  "es": {
    "Delete post": "Eliminar publicación",
  }
};

/**
 * - Shows post as a [`@mui/Card`](https://mui.com/api/card) within the [`core/Feed`](/docs/core-feed--default). 
 */
const PostCard = ({ post, onEdit }) => {
  const auth = useAuth(), locale = useLocale(), menu = useMenu(), author = post?.profileDisplayName || "@" + post?.profileUsername;

  const handleEdit = e => { menu.close(); onEdit(e); }
  const handleRemove = () => { menu.close(); deleteDoc(doc(Posts, post.id)); }

  return (
    <PostCardLayout sx={t => ({ borderTop: "1px solid "+t.palette.divider, '&:last-of-type': { borderBottom: "1px solid "+t.palette.divider } })}
      action={
        auth.isLoggedIn && post?.profileId === auth.uid && <>
          <IconButton color="secondary" onClick={menu.open} TooltipProps={{ hide: menu.isOpen, title: l("More", GENERAL, locale) }}>
            <MoreHoriz />
          </IconButton>
          <Menu anchorEl={menu.el} open={menu.isOpen} onClose={menu.close} placement="end">
            <MenuItem onClick={handleEdit}>
              <ListItemIcon>
                <EditOutlined />
              </ListItemIcon>
              <ListItemText primary={<I dict={POST_ACTIONS} k="Edit post" width={72} />} />
            </MenuItem>
            <MenuItem onClick={handleRemove}>
              <ListItemIcon>
                <DeleteOutlined />
              </ListItemIcon>
              <ListItemText primary={<I dict={POST_CARD} k="Delete post" width={72} />} />
            </MenuItem>
          </Menu>
        </>
      }
      avatar={
        post ?
          <Link href={"/" + post?.profileUsername} underline="none"><ProfileAvatar alt={author} src={post?.profilePhotoURL} /></Link>
          :
          <ProfileAvatar alt={author} ready={false} />
      }
      title={
        post ?
          <><Link href={"/" + post.profileUsername}>{author}</Link>{" · "+post.time}</>
          :
          <Skeleton width={160} />
      }>
      <Typography style={{ whiteSpace: 'pre-wrap' }}>{post ? post.content : <Skeleton />}</Typography>
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
      <Feed collection={Posts} Item={(post, key) => <PostCard key={key} onEdit={handleEdit(post)} post={post} />} sx={{ maxWidth: 600, minWidth: 400 }} {...props} />
      <PostDialog post={post} open={postDialog.isOpen} onClose={postDialog.close} /> 
    </>
  )
}

export { PostFeed as default, PostCard };
