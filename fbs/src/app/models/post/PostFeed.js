import { Feed } from 'core'
import { PostCard, PostDialog, Posts, usePostDialog } from 'models/post'

const PostFeed = ({ profileId }) => {
  const [postDialog, post] = usePostDialog(),
        handleEdit = post => () => postDialog.open(post);

  return (
    <>
      <Feed CardComponent={PostCard} CardProps={post => ({ post, onEdit: handleEdit(post) })} collection={Posts} profileId={profileId} />
      <PostDialog post={post} open={postDialog.isOpen} onClose={postDialog.close} /> 
    </>
  )
}

export default PostFeed;
