import { Box, Button, Link, Typography } from '@material-ui/core'

import { Authorize } from 'auth'
import { FeedLayout } from 'layouts'
import { StoryFeed } from 'models/story'

const StoriesPage = () => {
  return (
    <Authorize>
      <FeedLayout maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between", p: t => t.spacing(2, 1, 4, 1) }}>
          <Typography variant="h4">Your Stories</Typography>
          <Button component={Link} href="/new">Write a story</Button>
        </Box>
        <StoryFeed />
      </FeedLayout>
    </Authorize>
  )
}

export default StoriesPage;
