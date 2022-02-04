import { Link, List, ListItemButton, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { DeleteOutlined, EditOutlined, HistoryEdu, HomeOutlined, PersonOutlined } from '@mui/icons-material'

import { Default as ListDefault, Drawer as ListDrawer } from './List.stories'
import { sx } from './utils'

ListItemText.__docgenInfo.description = "- For more see: [`ListItemText`](https://mui.com/api/list-item-text)\n- We use only following props:"

const ListItemTextStory = {
  component: ListItemText,
  title: '@mui/ListItemText',
  argTypes: {
    children: { table: { disable: true } },
    classes: { table: { disable: true } },
    disableTypography: { table: { disable: true } },
    inset: { table: { disable: true } },
    primary: { control: { type: "text" } },
    primaryTypographyProps: { table: { disable: true } },
    secondary: { table: { disable: true } },
    secondaryTypographyProps: { table: { disable: true } },
    sx
  },
}

const Default = ({ sx, ...args }) =>
  <List>
    <MenuItem>
      <ListItemIcon><EditOutlined /></ListItemIcon>
      <ListItemText sx={sx} {...args} />
    </MenuItem>
    <MenuItem>
      <ListItemIcon><DeleteOutlined /></ListItemIcon>
      <ListItemText primary="Delete" sx={sx} />
    </MenuItem>
  </List>

Default.args = { primary: "Edit" };

Default.parameters = ListDefault.parameters

const Drawer = args =>
  <List>
    {[{ Icon: HomeOutlined, primary: "Home" }, { Icon: PersonOutlined, primary: "Profile" }, { Icon: HistoryEdu, primary: "Stories" }].map(({ Icon, primary }, i) => 
      <ListItemButton key={i} component={Link} href="/">
        <ListItemIcon sx={{ my: 1 }}><Icon fontSize="large" /></ListItemIcon>
        <ListItemText primary={primary} sx={{ display: { xs: "none", md: "block" }, fontSize: "1.15rem", ml: 0.5 }} {...args} />
      </ListItemButton>
    )}
  </List>

Drawer.parameters = ListDrawer.parameters

export { ListItemTextStory as default, Default, Drawer } 
