import { CssBaseline } from '@mui/material'

CssBaseline.__docgenInfo = { description: "- For more see: [`CssBaseline`](https://mui.com/api/css-baseline)\n- We use only following props:" }

const CssBaselineStory = {
  component: CssBaseline,
  title: '@mui/CssBaseline',
  argTypes: {
    children: { table: { disable: true } },
    enableColorScheme: { table: { disable: true } },
  },
}

const Default = args => <CssBaseline {...args} />

export { CssBaselineStory as default, Default } 
