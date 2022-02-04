import { Avatar } from '@mui/material'

Avatar.__docgenInfo.description = "- For more see: [`Avatar`](https://mui.com/api/avatar)\n- We use only following props:"

const AvatarStory = {
  component: Avatar,
  title: '@mui/Avatar',
  argTypes: {
    children: { control: { type: null } },
    classes: { table: { disable: true } },
    component: { table: { disable: true } },
    imgProps: { table: { disable: true } },
    sizes: { table: { disable: true } },
    src: { table: { disable: true } },
    srcSet: { table: { disable: true } },
    sx: { table: { disable: true } },
    variant: { table: { disable: true } },
  },
}

const Default = args => <Avatar {...args} />

export { AvatarStory as default, Default } 
