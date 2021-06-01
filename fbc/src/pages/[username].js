import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { FeedLayout } from 'layouts'
import { PostFeed } from 'models/post'
import { Profile, Usernames } from 'models/profile'

const ProfilePage = () => {
  const router = useRouter(), { username } = router.query, [profileId, setProfileId] = useState(null);

  useEffect(() => username && Usernames.doc(username).get()
    .then(doc => doc.exists ? setProfileId(doc.data().profileId) : router.replace("/"), () => router.replace("/")), [username]);

  return (
    <FeedLayout>
      <Profile key={"Profile-" + username} profileId={profileId} />
      <PostFeed key={"PostFeed-" + username} profileId={profileId} ready={profileId} />
    </FeedLayout>
  )
}

export default ProfilePage;
