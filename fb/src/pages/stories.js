import { Box, Button, Link, Typography } from '@material-ui/core'

import { FeedLayout } from 'core/layouts'
import { StoryFeed } from 'story'
import { Authorize, useAuth } from 'user'

const StoriesPage = () => {
  const auth = useAuth();
  return (
    <Authorize>
      <FeedLayout maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between", p: t => t.spacing(2, 1, 4, 1) }}>
          <Typography variant="h4">Your Stories</Typography>
          <Button component={Link} href="/create">Write a story</Button>
        </Box>
        <StoryFeed profileId={auth.uid} />
      </FeedLayout>
    </Authorize>
  )
}

export default StoriesPage;
