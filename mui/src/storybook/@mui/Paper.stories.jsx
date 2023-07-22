import { ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material'
import { DeleteOutlined, EditOutlined } from '@mui/icons-material'

import { Default as ListDefault } from './List.stories'
import { sx } from './utils'

Paper.__docgenInfo = { description: "- For more see: [`Paper`](https://mui.com/api/paper)\n- We use only following props:" }

const PaperStory = {
  component: Paper,
  title: '@mui/Paper',
  argTypes: {
    children: { control: { type: null } },
    classes: { table: { disable: true } },
    component: { table: { disable: true } },
    elevation: { table: { disable: true } },
    square: { table: { disable: true } },
    sx,
    variant: { table: { disable: true } },
  },
}

const Default = args =>
  <Paper {...args}>
    <MenuList>
      <MenuItem>
        <ListItemIcon><EditOutlined /></ListItemIcon>
        <ListItemText primary="Edit" />
      </MenuItem>
      <MenuItem>
        <ListItemIcon><DeleteOutlined /></ListItemIcon>
        <ListItemText primary="Delete" />
      </MenuItem>
    </MenuList>
  </Paper>

const Simple = args =>
  <Paper {...args}>
    <MenuList>
      <MenuItem>Item #1</MenuItem>
      <MenuItem>Item #2</MenuItem>
      <MenuItem>Item #3</MenuItem>
    </MenuList>
  </Paper>

Default.parameters = ListDefault.parameters;

export { PaperStory as default, Default, Simple } 
