import { Feed } from 'core'
import { PostCard, PostDialog, Posts, usePostDialog } from 'models/post'

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

export default PostFeed;
