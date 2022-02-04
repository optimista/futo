import { useMenu } from '@futo-ui/hooks'
import { keys } from '@futo-ui/utils'
import { DeleteOutlined, EditOutlined, ExpandMore } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, Link, ListItemIcon, ListItemText, MenuItem, Skeleton, Typography } from '@mui/material'
import { deleteDoc, doc } from 'firebase/firestore'
import PropTypes from 'prop-types'

import { Feed, IconButton, Menu } from 'core'
import { FeedLayout } from 'core/layouts'
import { Stories } from 'story'
import { storyPath, storyEditPath } from 'story/utils'
import { Authorize, useAuth } from 'user'

/**
 * - [`@mui/Card`](/docs/mui-card--default) for the story component.
 * - Includes [`@mui/MenuItem`](https://mui.com/api/menu-item) to edit & to remove the story.
 */
const StoryCard = ({ story }) => {
  const auth = useAuth(), menu = useMenu();

  const handleRemove = () => {
    menu.close();
    deleteDoc(doc(Stories, story.id));
  }

  // Helpers
  const description = s => s.nodes[keys(story.nodes)[1]]?.content,
        lastEdited = ({ editedAtTime, nodes }) => "Last edited: " + editedAtTime + " · " + keys(nodes).length + " nodes",
        title = s => s.nodes[keys(story.nodes)[0]]?.content || "Untitled Story";

  return (
    <Card sx={{ border: 0, display: "flex", justifyContent: "space-between" }}>
      <CardContent>
        {
          story ?
            <>
              <Link href={storyPath(story)} sx={{ display: "block" }} underline="none" variant="h6">{title(story)}</Link>
              { description(story) && <Typography variant="subtitle1">{description(story)}</Typography> }
              <Typography variant="overline">{lastEdited(story)}</Typography>
            </>
            :
            <>
              <Skeleton width={200} />
              <Skeleton width={400} />
              <Skeleton width={180} />
            </>
        }
      </CardContent>
      { auth.isLoggedIn && story?.profileId === auth.uid && 
        <CardActions>
          {
            story ?
              <>
                <IconButton color="secondary" onClick={menu.open} TooltipProps={{ hide: menu.isOpen, title: "More" }}>
                  <ExpandMore />
                </IconButton>
                <Menu anchorEl={menu.el} arrow open={menu.isOpen} onClose={menu.close} placement="end">
                  <MenuItem component={Link} href={storyEditPath(story)}>
                    <ListItemIcon>
                      <EditOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Edit story" />
                  </MenuItem>
                  <MenuItem onClick={handleRemove}>
                    <ListItemIcon>
                      <DeleteOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Remove story" />
                  </MenuItem>
                </Menu>
              </>
              :
              <Skeleton height={32} variant="circular" width={32} />
          }
        </CardActions>
      }
    </Card>
  )
}

StoryCard.propTypes = {
  /**
   * Story object as fetched from the database.
   */
  story: PropTypes.object, 
};

/**
 * - Defines [`core/Feed`](/docs/core-feed--default) for stories using [`story/StoryCard`](/docs/story-storycard--default).
 * - Props of the [`core/Feed`](/docs/core-feed--default) are also available.
 */
const StoryFeed = props =>
  <Feed Item={({ item, ...props }) => <StoryCard story={item} {...props} />} collection={Stories} sortBy="editedAt" {...props} />

const StoriesPage = () => {
  const auth = useAuth();
  return (
    <Authorize>
      <FeedLayout maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between", p: t => t.spacing(2, 1, 4, 1) }}>
          <Typography variant="h4">Your Stories</Typography>
          <Button href="/create">Write a story</Button>
        </Box>
        <StoryFeed profileId={auth.uid} />
      </FeedLayout>
    </Authorize>
  )
}

export { StoriesPage as default, StoryCard, StoryFeed };
