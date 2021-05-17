import { useRouter } from 'next/router'

import { FeedLayout } from 'layouts'
import { PostFeed } from 'models/post'
import { Profile } from 'models/profile'

const ProfilePage = () => {
  const router = useRouter(), 
        { username } = router.query;

  return (
    <FeedLayout>
      <Profile key={"Profile-" + username} />
      <PostFeed key={"PostFeed-" + username} />
    </FeedLayout>
  )
}

export default ProfilePage;
