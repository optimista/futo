import { useRouter } from 'next/router'

import { FeedLayout } from 'layouts'
import { PostFeed } from 'models/post'
import { Profile } from 'models/profile'

const ProfilePage = () => {
  const router = useRouter(), 
        { username } = router.query;

  return (
    <FeedLayout>
      <Profile key={username + "-Profile"} />
      <PostFeed key={username + "-PostFeed"} />
    </FeedLayout>
  )
}

export default ProfilePage;
