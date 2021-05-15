import Head from 'next/head'
import { useRouter } from 'next/router'

import { FeedLayout } from 'layouts'
import { PostFeed } from 'models/post'
import { Profile } from 'models/profile'

const ProfilePage = ({ bio, displayName, photoURL }) => {
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
        <meta property="og:url" content={"https://myapp.vercel.app/"+username} />
        <meta property="og:image" content={photoURL} />
        <meta property="og:image:alt" content={imageAlt} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@myapp" />
        <meta name="twitter:image:alt" content={imageAlt} />
        <title>{name}</title>
      </Head>
      <FeedLayout>
        <Profile key={username + "-Profile"} />
        <PostFeed key={username + "-PostFeed"} />
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
    props: { displayName, bio, photoURL }, // will be passed to the page component as props
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
