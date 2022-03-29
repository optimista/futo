import { Typography } from '@mui/material'

import { radio, sx } from './utils'

Typography.__docgenInfo.description = "- For more see: [`Typography`](https://mui.com/api/typography)\n- We use only following props:"

const TypographyStory = {
  component: Typography,
  title: '@mui/Typography',
  argTypes: {
    align: { table: { disable: true } },
    children: { control: { type: "text" } },
    classes: { table: { disable: true } },
    component: { table: { disable: true } },
    gutterBottom: { table: { defaultValue: { summary: "false" } } },
    noWrap: { table: { disable: true } },
    paragraph: { table: { defaultValue: { summary: "false" } } },
    sx,
    variant: radio(["h4", "h5", "h6", "body1", "subtitle1", "caption", "overline"], "body1"),
    variantMapping: { table: { disable: true } },
  }
}

const Default = args => <Typography {...args} />
const title4 = Default.bind({});
const title5 = Default.bind({});
const title6 = Default.bind({});
const subtitle1 = Default.bind({});
const overline = Default.bind({});
const body1 = Default.bind({});
  
Default.args = {
  children: "Typography"
}

title4.args = {
  children: "Title 4",
  variant: "h4"
}

title5.args = {
  children: "Title 5",
  variant: "h5"
}

title6.args = {
  children: "Title 6",
  variant: "h6"
}

subtitle1.args = {
  children: "Subtitle 1",
  variant: "subtitle1"
}

overline.args = {
  children: "overline",
  variant: "overline"
}

body1.args = {
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices metus ex, a lobortis purus aliquet quis. Nam ac fermentum sapien, eu pretium lacus. Praesent non erat sed lorem posuere faucibus. Aliquam varius mi id placerat auctor. Aenean at sem felis. Vivamus gravida consectetur varius. Vivamus sed neque ultricies sapien ornare fringilla. Donec ac leo ullamcorper, auctor ante et, interdum libero. Donec pulvinar dolor felis, a condimentum purus faucibus vel. Vestibulum tristique tincidunt nibh, a condimentum magna facilisis consectetur. Integer velit leo, commodo nec facilisis nec, porta a mauris. Suspendisse egestas varius massa, at rutrum elit auctor in.",
  variant: "body1"
}

body1.parameters = {
  layout: "padded"
}

export { TypographyStory as default, Default, title4, title5, title6, subtitle1, overline, body1 } 
