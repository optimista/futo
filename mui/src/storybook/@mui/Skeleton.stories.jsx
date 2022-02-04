import { Skeleton } from '@mui/material'

import { radio } from './utils'

Skeleton.__docgenInfo.description = "- For more see: [`Skeleton`](https://mui.com/api/skeleton)\n- We use only following props:"

const SkeletonStory = {
  component: Skeleton,
  title: '@mui/Skeleton',
  argTypes: {
    animation: { table: { disable: true } },
    children: { table: { disable: true } },
    classes: { table: { disable: true } },
    component: { table: { disable: true } },
    height: { control: { type: "number" } },
    sx: { table: { disable: true } },
    variant: radio(["circular", "rectangular", "text"], "text"),
    width: { control: { type: "number" } },
  },
}

const Default = args => <Skeleton {...args} />
const Circular = Default.bind({}); 
const Rectangular = Default.bind({}); 

Default.args = {
  width: 240
}

Circular.args = {
  height: 48,
  variant: "circular",
  width: 48
}

Rectangular.args = {
  height: 60,
  variant: "rectangular",
  width: 240 
}

export { SkeletonStory as default, Default, Circular, Rectangular } 
