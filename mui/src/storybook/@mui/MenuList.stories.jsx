import { ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material'
import { DeleteOutlined, EditOutlined } from '@mui/icons-material'

import { Default as ListDefault } from './List.stories'

MenuList.__docgenInfo = { description: "- For more see: [`MenuList`](https://mui.com/api/menu-list)\n- We use only following props:" }

const MenuListStory = {
  component: MenuList,
  title: '@mui/MenuList',
  argTypes: {
    autoFocus: { table: { disable: true } },
    autoFocusItem: { table: { disable: true } },
    children: { control: { type: null } },
    disabledItemsFocusable: { table: { disable: true } },
    disableListWrap: { table: { disable: true } },
    variant: { table: { disable: true } },
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

const Simple = ({ children, ...args}) =>
  <MenuList {...args}>
    <MenuItem>Item #1</MenuItem>
    <MenuItem>Item #2</MenuItem>
    <MenuItem>Item #3</MenuItem>
  </MenuList>

Default.parameters = ListDefault.parameters;

export { MenuListStory as default, Default, Simple } 
