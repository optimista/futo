import { Link, List, ListItemButton, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { DeleteOutlined, EditOutlined, HistoryEdu, HomeOutlined, PersonOutlined } from '@mui/icons-material'

List.__docgenInfo = { description: "- For more see: [`List`](https://mui.com/api/list)\n- We use only following props:" }

const ListStory = {
  component: List,
  title: '@mui/List',
  argTypes: {
    children: { control: { type: null } },
    classes: { table: { disable: true } },
    component: { table: { disable: true } },
    dense: { table: { disable: true } },
    disablePadding: { table: { disable: true } },
    subheader: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
}

const Default = args =>
  <List {...args}>
    <MenuItem>
      <ListItemIcon><EditOutlined /></ListItemIcon>
      <ListItemText primary="Edit" />
    </MenuItem>
    <MenuItem>
      <ListItemIcon><DeleteOutlined /></ListItemIcon>
      <ListItemText primary="Delete" />
    </MenuItem>
  </List>

const Drawer = args =>
  <List {...args}>
    {[{ Icon: HomeOutlined, primary: "Home" }, { Icon: PersonOutlined, primary: "Profile" }, { Icon: HistoryEdu, primary: "Stories" }].map(({ Icon, primary }, i) => 
      <ListItemButton key={i} component={Link} href="/">
        <ListItemIcon sx={{ my: 1 }}><Icon fontSize="large" /></ListItemIcon>
        <ListItemText primary={primary} sx={{ display: { xs: "none", md: "block" }, fontSize: "1.15rem", ml: 0.5 }} />
      </ListItemButton>
    )}
  </List>

Default.parameters = {
  docs: { source: { transform: src => {
    const icons = ["EditOutlined", "DeleteOutlined"];
    return src.replace(/\[object Object\]/g, () => icons.shift());
  }}}
}

Drawer.parameters = {
  docs: { source: { transform: src => {
    const icons = ["HomeOutlined", "PersonOutlined", "HistoryEdu"];
    return src.replaceAll(/component={{[\s\S]*?}}/g, "component={Link}").replace(/\[object Object\]/g, () => icons.shift());
  }}}
}

export { ListStory as default, Default, Drawer } 
