import { Link, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { HistoryEdu, HomeOutlined, PersonOutlined } from '@mui/icons-material'

import { Drawer } from './List.stories'

ListItemButton.__docgenInfo.description = "- For more see: [`ListItemButton`](https://mui.com/api/list-item-button)\n- We use only following props:"

const ListItemButtonStory = {
  component: ListItemButton,
  title: '@mui/ListItemButton',
  argTypes: {
    alignItems: { table: { disable: true } },
    autoFocus: { table: { disable: true } },
    children: { control: { type: null } },
    classes: { table: { disable: true } },
    component: { control: { type: null } },
    dense: { table: { disable: true } },
    disabled: { table: { disable: true } },
    disableGutters: { table: { disable: true } },
    divider: { table: { disable: true } },
    focusVisibleClassName: { table: { disable: true } },
    selected: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
}

const Default = args =>
  <List>
    {[{ Icon: HomeOutlined, primary: "Home" }, { Icon: PersonOutlined, primary: "Profile" }, { Icon: HistoryEdu, primary: "Stories" }].map(({ Icon, primary }, i) => 
      <ListItemButton key={i} component={Link} href="/" {...args}>
        <ListItemIcon sx={{ my: 1 }}><Icon fontSize="large" /></ListItemIcon>
        <ListItemText primary={primary} sx={{ display: { xs: "none", md: "block" }, fontSize: "1.15rem", ml: 0.5 }} />
      </ListItemButton>
    )}
  </List>

Default.parameters = Drawer.parameters

export { ListItemButtonStory as default, Default } 
