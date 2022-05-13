import { useMenu } from '@futo-ui/hooks'
import { keys } from '@futo-ui/utils'
import { DeleteOutlined, EditOutlined, ExpandMore } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, Link, ListItemIcon, ListItemText, MenuItem, Skeleton, Typography } from '@mui/material'
import { deleteDoc, doc } from 'firebase/firestore'
import PropTypes from 'prop-types'

import { Feed, IconButton, Menu } from 'core'
import { FeedLayout } from 'core/layouts'
import { GENERAL } from 'core/i18n'
import { l, I, IProvider, useLocale } from 'core/utils/i18n'
import { Stories } from 'story'
import { storyPath, storyEditPath, storyDesc, storyTitle } from 'story/utils'
import { Authorize, useAuth } from 'user'

const STORY_CARD = {
  lastEdited: ({ editedAtTime, nodes }, lastEditedStr, nodesStr) => lastEditedStr + ": " + editedAtTime + " · " + keys(nodes).length + " " + nodesStr,
  "en": {
    "Last edited": story => STORY_CARD.lastEdited(story, "Last edited", "nodes"),
    "Edit story": "Edit story",
    "Remove story": "Remove story"
  },
  "es": {
    "Last edited": story => STORY_CARD.lastEdited(story, "Última modificación", "nodos"),
    "Edit story": "Editar historia",
    "Remove story": "Eliminar historia"
  }
}

/**
 * - [`@mui/Card`](/docs/mui-card--default) for the story component.
 * - Includes [`@mui/MenuItem`](https://mui.com/api/menu-item) to edit & to remove the story.
 */
const StoryCard = ({ story }) => {
  const auth = useAuth(), locale = useLocale(), menu = useMenu(),
        description = storyDesc(story), title = storyTitle(story, locale);

  const handleRemove = () => {
    menu.close();
    deleteDoc(doc(Stories, story.id));
  }

  return (
    <IProvider value={STORY_CARD}>
      <Card sx={{ border: 0, display: "flex", justifyContent: "space-between" }}>
        <CardContent>
          {
            <>
              { story ? <Link href={storyPath(story)} sx={{ display: "block" }} underline="none" variant="h6">{title}</Link> : <Skeleton width={240} /> }
              { (!story || description) && <Typography variant="subtitle1">{story ? description : <Skeleton width={320} /> }</Typography> }
              <Typography variant="overline"><I arg={story} k={story ? "Last edited" : undefined} width={180} /></Typography>
            </>
          }
        </CardContent>
        { auth.isLoggedIn && story?.profileId === auth.uid && 
          <CardActions>
            {
              story ?
                <>
                  <IconButton color="secondary" onClick={menu.open} TooltipProps={{ hide: menu.isOpen, title: l("More", GENERAL, locale) }}>
                    <ExpandMore />
                  </IconButton>
                  <Menu anchorEl={menu.el} arrow open={menu.isOpen} onClose={menu.close} placement="end">
                    <MenuItem component={Link} href={storyEditPath(story)}>
                      <ListItemIcon>
                        <EditOutlined />
                      </ListItemIcon>
                      <ListItemText primary={<I k="Edit story" width={90} />} />
                    </MenuItem>
                    <MenuItem onClick={handleRemove}>
                      <ListItemIcon>
                        <DeleteOutlined />
                      </ListItemIcon>
                      <ListItemText primary={<I k="Remove story" width={90} />} />
                    </MenuItem>
                  </Menu>
                </>
                :
                <Skeleton height={32} variant="circular" width={32} />
            }
          </CardActions>
        }
      </Card>
    </IProvider>
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

const STORIES_PAGE = {
  "en": {
    "Your Stories": "Your Stories",
    "Write a story": "Write a story"
  },
  "es": {
    "Your Stories": "Tus historias",
    "Write a story": "Escribir una historia"
  }
}

const StoriesPage = () => {
  const auth = useAuth();
  return (
    <Authorize if={auth => auth.isLoggedIn} redirect="/">
      <FeedLayout maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between", p: t => t.spacing(2, 1, 4, 1) }}>
          <IProvider value={STORIES_PAGE}>
            <Typography variant="h4"><I k="Your Stories" width={170} /></Typography>
            <Button href="/create"><I k="Write a story" width={120} /></Button>
          </IProvider>
        </Box>
        <StoryFeed profileId={auth.uid} />
      </FeedLayout>
    </Authorize>
  )
}

export { StoriesPage as default, StoryCard, StoryFeed };
