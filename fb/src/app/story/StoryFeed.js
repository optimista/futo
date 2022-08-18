import { useMenu } from '@futo-ui/hooks'
import { keys } from '@futo-ui/utils'
import { DeleteOutlined, EditOutlined, ExpandMore } from '@mui/icons-material'
import { Card, CardActions, CardContent, Link, ListItemIcon, ListItemText, MenuItem, Skeleton, Typography } from '@mui/material'
import { deleteDoc, doc } from 'firebase/firestore'
import PropTypes from 'prop-types'

import { Feed, IconButton, Menu } from 'core'
import { GENERAL } from 'core/i18n'
import { l, I, IProvider, useLocale } from 'core/utils/i18n'
import { Stories } from 'story'
import { storyAuthorized, storyPath, storyEditPath, storyTitle, storyDesc } from 'story/utils'
import { useAuth } from 'user'

const STORY_CARD = {
  lastEdited: ({ editedAtTime, nodes }, lastEditedStr, nodesStr, now) => lastEditedStr + ": " + editedAtTime || now + " · " + keys(nodes).length + " " + nodesStr,
  "en": {
    "Last edited": story => STORY_CARD.lastEdited(story, "Last edited", "nodes", "Now"),
    "Edit story": "Edit story",
    "Remove story": "Remove story"
  },
  "es": {
    "Last edited": story => STORY_CARD.lastEdited(story, "Última modificación", "nodos", "Ahora"),
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
      <Card sx={t => ({ border: 0, display: "flex", justifyContent: "space-between", borderTop: "1px solid "+t.palette.divider, '&:last-of-type': { borderBottom: "1px solid "+t.palette.divider } })}>
        <CardContent>
          {
            <>
              { story ? <Link href={storyPath(story)} sx={{ display: "block" }} underline="none" variant="h6">{title}</Link> : <Skeleton width={240} /> }
              { (!story || description) && <Typography variant="subtitle1">{story ? description : <Skeleton width={320} /> }</Typography> }
              <Typography variant="overline"><I arg={story} k={story ? "Last edited" : undefined} width={180} /></Typography>
            </>
          }
        </CardContent>
        { storyAuthorized(story, auth.uid) && <CardActions>
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
        </CardActions> }
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
  <Feed collection={Stories} Item={(story, key) => <StoryCard key={key} story={story} />} sortBy="editedAt" {...props} />

export { StoryFeed as default, StoryCard };
