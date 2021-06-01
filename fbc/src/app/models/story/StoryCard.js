import { useMenu } from '@futo-ui/hooks'
import { time } from '@futo-ui/utils'
import { Card, CardActions, CardContent, Link, ListItemIcon, ListItemText, MenuItem, Skeleton, Typography } from '@material-ui/core'
import { DeleteOutlined, EditOutlined, ExpandMore } from '@material-ui/icons'

import { IconButton, Menu } from 'core'
import { Stories } from 'models/story'

const StoryCard = ({ story }) => {
  const menu = useMenu();

  const handleRemove = () => { menu.close(); Stories.doc(story.id).delete(); }

  return (
    <Card sx={{ border: 0, display: "flex", justifyContent: "space-between" }}>
      <CardContent>
        {
          story ?
            <>
              <Link href={"/s/" + story.id} sx={{ display: "block" }} underline="none" variant="h6">{ story.nodes[story.order[0]]?.content || "Untitled Story" }</Link>
              { story.order[1] && <Typography variant="subtitle1">{story.nodes[story.order[1]].content}</Typography> }
              <Typography variant="overline">{ "Last edited: " + time(story.editedAt) + " · " + story.order.length + " nodes" }</Typography>
            </>
            :
            <>
              <Skeleton width={200} />
              <Skeleton width={400} />
              <Skeleton width={180} />
            </>
        }
      </CardContent>
      <CardActions>
        {
          story ?
            <>
              <IconButton aria-controls="menu-storycard" aria-label="more" color="secondary" onClick={menu.open} hideTooltip={menu.isOpen} tooltip="More">
                <ExpandMore />
              </IconButton>
              <Menu anchorEl={menu.el} arrow open={menu.isOpen} onClose={menu.close} placement="end">
                <MenuItem component={Link} href={"/s/" + story.id + "/edit"}>
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
    </Card>
  )
}

export default StoryCard;
