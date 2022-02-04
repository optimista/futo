import { MoreHoriz } from '@mui/icons-material'

import { IconButton } from 'core'
import { PostCardLayout } from 'post'
import { ProfileAvatar } from 'profile'

const PostCardLayoutStory = {
  component: PostCardLayout,
  title: 'post/PostCardLayout',
  argTypes: {
    action: { control: { type: null } },
    avatar: { control: { type: null } },
    children: { control: { type: "text" } },
    title: { control: { type: "text" } }
  },
}

const Default = args => <PostCardLayout {...args} />

Default.args = {
  action: <IconButton><MoreHoriz /></IconButton>,
  avatar: <ProfileAvatar />,
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis libero velit, quis pellentesque elit pellentesque quis. Ut erat leo, luctus efficitur convallis id, posuere ut sem. Sed scelerisque mollis eros, nec bibendum ligula pulvinar a. Ut a felis enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi cursus leo sed metus bibendum, non pulvinar ante bibendum. Pellentesque dictum sed lorem id mattis. Sed laoreet ac est vel tempor. Quisque malesuada dignissim tellus eget gravida. Duis bibendum nulla augue, sed tincidunt arcu eleifend sed. Nulla a blandit arcu. Sed rutrum odio sit amet convallis pharetra.",
  title: "@optimista · 10 Jan"
}

Default.parameters = {
  docs: { transformSource: src => src.replace('[object Object]', 'MoreHoriz') }
}

export { PostCardLayoutStory as default, Default } 
