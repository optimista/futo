import { PersonOutlined } from '@mui/icons-material'

import { DrawerItem } from 'core/layouts/FeedLayout'

const DrawerItemStory = {
  component: DrawerItem,
  title: 'core/layouts/FeedLayout/DrawerItem',
  argTypes: { "Icon": { control: { type: null } } }
}

const Default = args => <DrawerItem {...args} />

Default.args = {
  children: "Profile",
  href: "/",
  Icon: PersonOutlined
}

export { DrawerItemStory as default, Default } 
