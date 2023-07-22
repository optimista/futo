import { Grid } from '@mui/material'

import { sx } from './utils'

Grid.__docgenInfo = { description: "- For more see: [`Grid`](https://mui.com/api/grid)\n- We use only following props:" }

const GridStory = {
  component: Grid,
  title: '@mui/Grid',
  argTypes: {
    children: { control: { type: "text" } },
    classes: { table: { disable: true } },
    columns: { table: { disable: true } },
    columnSpacing: { table: { disable: true } },
    component: { table: { disable: true } },
    container: { control: { type: null }, table: { defaultValue: { summary: "false" } } },
    direction: { table: { disable: true } },
    item: { control: { type: null }, table: { defaultValue: { summary: "false" } } },
    lg: { table: { disable: true } },
    md: { table: { disable: true } },
    rowSpacing: { table: { disable: true } },
    sm: { table: { disable: true } },
    spacing: { control: { type: "number" }, table: { defaultValue: { summary: 0 }, type: { summary: "number" } } },
    sx,
    wrap: { table: { disable: true } },
    xl: { table: { disable: true } },
    xs: { control: { type: "number" }, table: { defaultValue: { summary: "false" }, type: { summary: "bool | number" } } },
    zeroMinWidth: { table: { disable: true } },
  },
}

const Default = ({ children, xs, ...args }) =>
  <Grid container {...args}>
    {[1,2,3,4].map(i => 
      <Grid key={i} item xs={xs}>{children + ": #" + i}</Grid>
    )}
  </Grid>

Default.args = {
  children: "Item" 
}

export { GridStory as default, Default } 
