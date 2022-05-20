import { Box, Button, Typography } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { FeedLayout } from 'core/layouts'
import { I, IProvider } from 'core/utils/i18n'
import { Profiles, Usernames } from 'profile'
import { StoryFeed } from 'story'

const STORIES_PAGE = {
  "en": {
    "Stories of": name => name + "' Stories",
    "Write a story": "Write a story"
  },
  "es": {
    "Stories of": name => "Historias de " + name,
    "Write a story": "Escribir una historia"
  }
}

const StoriesPage = ({ profileId }) => {
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => { if (profileId) getDoc(doc(Profiles, profileId)).then(docProfile => setDisplayName(docProfile.data().displayName)); }, [profileId]);

  return (
    <FeedLayout maxWidth="lg">
      <Box sx={{ display: "flex", justifyContent: "space-between", p: t => t.spacing(2, 1, 4, 1) }}>
        <IProvider value={STORIES_PAGE}>
          <Typography variant="h4"><I arg={displayName} k={displayName ? "Stories of" : undefined} width={240} /></Typography>
          <Button href="/create"><I k="Write a story" width={120} /></Button>
        </IProvider>
      </Box>
      <StoryFeed profileId={profileId} />
    </FeedLayout>
  )
}

const getStaticProps = async ({ params }) => {
  const docUsername = await getDoc(doc(Usernames, params.username));
  if (!docUsername.exists()) return { redirect: { destination: '/', permanent: false } };
  const { profileId } = docUsername.data();

  return {
    props: { profileId }, // will be passed to the page component as props
    revalidate: 1000
  }
}

const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true 
  }
}

export { StoriesPage as default, StoryFeed, getStaticPaths, getStaticProps };
