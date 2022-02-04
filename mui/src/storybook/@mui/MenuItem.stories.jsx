import { ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material'
import { DeleteOutlined, EditOutlined } from '@mui/icons-material'

import { Default as ListDefault } from './List.stories'

MenuItem.__docgenInfo.description = "- For more see: [`MenuItem`](https://mui.com/api/menu-item)\n- We use only following props:"

const MenuItemStory = {
  component: MenuItem,
  title: '@mui/MenuItem',
  args: { children: "Item #2" }, // Default values
  argTypes: {
    autoFocus: { table: { disable: true } },
    component: { control: { type: null } },
    children: { control: { type: null } },
    classes: { table: { disable: true } },
    dense: { table: { disable: true } },
    disableGutters: { table: { disable: true } },
    divider: { table: { disable: true } },
    focusVisibleClassName: { table: { disable: true } },
    onClick: { control: { type: null }, description: "Optional click handler", table: { type: { summary: "func" } } },
    sx: { table: { disable: true } },
    tabIndex: { table: { disable: true } },
  },
}

const Default = args =>
  <MenuList {...args}>
    <MenuItem>
      <ListItemIcon><EditOutlined /></ListItemIcon>
      <ListItemText primary="Edit" />
    </MenuItem>
    <MenuItem>
      <ListItemIcon><DeleteOutlined /></ListItemIcon>
      <ListItemText primary="Delete" />
    </MenuItem>
  </MenuList>

const Simple = args =>
  <MenuList>
    <MenuItem {...args}>Item #1</MenuItem>
    <MenuItem {...args}>Item #2</MenuItem>
    <MenuItem {...args}>Item #3</MenuItem>
  </MenuList>

Default.parameters = ListDefault.parameters;

export { MenuItemStory as default, Default, Simple } 
