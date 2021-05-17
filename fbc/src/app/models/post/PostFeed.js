import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Feed } from 'core'
import { PostCard, PostDialog, Posts, usePostDialog } from 'models/post'
import { Usernames } from 'models/profile'

const PostFeed = () => {
  const router = useRouter(), 
        { username } = router.query,
        [postDialog, post] = usePostDialog(),
        [profileId, setProfileId] = useState(null),
        handleEdit = post => () => postDialog.open(post);

  useEffect(() => {
    if (router.isReady) {
      if (username) {
        Usernames.doc(username).get().then(docUsername => {
          if (!docUsername.exists) return router.push("/");
          const { profileId } = docUsername.data();
          setProfileId(profileId);
        })
      } else { setProfileId(undefined); }
    }
  }, [username])

  return (
    <>
      <Feed CardComponent={PostCard} CardProps={post => ({ post, onEdit: handleEdit(post) })} collection={Posts} profileId={profileId} />
      <PostDialog post={post} open={postDialog.isOpen} onClose={postDialog.close} /> 
    </>
  )
}

export default PostFeed;
