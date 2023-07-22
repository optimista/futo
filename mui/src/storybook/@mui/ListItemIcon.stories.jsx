import { Link, List, ListItemButton, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { DeleteOutlined, EditOutlined, HistoryEdu, HomeOutlined, PersonOutlined } from '@mui/icons-material'

import { Default as ListDefault, Drawer as ListDrawer } from './List.stories'
import { sx } from './utils'

ListItemIcon.__docgenInfo = { description: "- For more see: [`ListItemIcon`](https://mui.com/api/list-item-icon)\n- We use only following props:" }

const ListItemIconStory = {
  component: ListItemIcon,
  title: '@mui/ListItemIcon',
  argTypes: {
    children: { control: { type: null } },
    classes: { table: { disable: true } },
    sx
  },
}

const Default = args =>
  <List>
    <MenuItem>
      <ListItemIcon {...args}><EditOutlined /></ListItemIcon>
      <ListItemText primary="Edit" />
    </MenuItem>
    <MenuItem>
      <ListItemIcon {...args}><DeleteOutlined /></ListItemIcon>
      <ListItemText primary="Delete" />
    </MenuItem>
  </List>

Default.parameters = ListDefault.parameters

const Drawer = args =>
  <List>
    {[{ Icon: HomeOutlined, primary: "Home" }, { Icon: PersonOutlined, primary: "Profile" }, { Icon: HistoryEdu, primary: "Stories" }].map(({ Icon, primary }, i) => 
      <ListItemButton key={i} component={Link} href="/">
        <ListItemIcon sx={{ my: 1 }} {...args}><Icon fontSize="large" /></ListItemIcon>
        <ListItemText primary={primary} sx={{ display: { xs: "none", md: "block" }, fontSize: "1.15rem", ml: 0.5 }} />
      </ListItemButton>
    )}
  </List>

Drawer.parameters = ListDrawer.parameters

export { ListItemIconStory as default, Default, Drawer } 
