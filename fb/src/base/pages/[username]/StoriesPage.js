'use client';

import { Box, Button, Typography } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { Profiles } from 'core/fb/colls'
import { FeedLayout } from 'core/layouts'
import { I, IProvider } from 'core/utils/i18n'
import { StoryFeed } from 'story'

const STORIES_PAGE = {
  "en": {
    "Stories of": name => name + "'s stories",
    "Write a story": "Write a story"
  },
  "es": {
    "Stories of": name => "Historias de " + name,
    "Write a story": "Escribir una historia"
  }
}

const StoriesPage = ({ profileId }) => {
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => { if (profileId) getDoc(doc(Profiles, profileId)).then(docProfile => { 
    const { displayName, username } = docProfile.data();
    setDisplayName(displayName || "@" + username)
  }); }, [profileId]);

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

export default StoriesPage;
