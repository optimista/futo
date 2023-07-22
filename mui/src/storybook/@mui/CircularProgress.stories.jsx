import { CircularProgress } from '@mui/material'

import { radio, sx } from './utils'

CircularProgress.__docgenInfo = { description: "- For more see: [`CircularProgress`](https://mui.com/api/circular-progress)\n- We use only following props:" }

const CircularProgressStory = {
  component: CircularProgress,
  title: '@mui/CircularProgress',
  argTypes: {
    classes: { table: { disable: true } },
    color: radio(["inherit", "primary"], "primary"),
    disableShrink: { table: { disable: true } },
    size: { control: { type: "number" }, table: { defaultValue: { summary: 24 } } },
    sx,
    thickness: { table: { disable: true } },
    value: { table: { disable: true } },
    variant: { table: { disable: true } }
  },
}

const Default = args => <CircularProgress {...args} />

export { CircularProgressStory as default, Default } 
