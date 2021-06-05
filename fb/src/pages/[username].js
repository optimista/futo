import Head from 'next/head'
import { useRouter } from 'next/router'

import { FeedLayout } from 'layouts'
import { PostFeed } from 'models/post'
import { Profile } from 'models/profile'

const ProfilePage = ({ bio, displayName, photoURL, profileId }) => {
  const router = useRouter(),
        { username } = router.query;

  const name = displayName || username,
        imageAlt = name+"'s profile picture";

  return (
    <>
      <Head>
        <meta property="og:title" content={name} />
        <meta property="og:description" content={bio} />
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={"https://fbs-demo.vercel.app/"+username} />
        <meta property="og:image" content={photoURL} />
        <meta property="og:image:alt" content={imageAlt} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@fbs-demo" />
        <meta name="twitter:image:alt" content={imageAlt} />
        <title>{name}</title>
      </Head>
      <FeedLayout>
        <Profile key={"Profile-" + username} profileId={profileId} />
        <PostFeed key={"PostFeed-" + username} profileId={profileId} />
      </FeedLayout>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const { firebase } = await import('utils/server'),
        docUsername = await firebase.firestore().collection('usernames').doc(params.username).get();

  if (!docUsername.exists) return { redirect: { destination: '/', permanent: false } };

  const { profileId } = docUsername.data(),
        docProfile = await firebase.firestore().collection('profiles').doc(profileId).get(),
        { displayName = null, bio = null, photoURL = null } = docProfile.data();

  return {
    props: { displayName, bio, photoURL, profileId }, // will be passed to the page component as props
    revalidate: 1000
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export default ProfilePage;

/*
 * PURELY CLIENT-SIDE PAGE
 *
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
*/
