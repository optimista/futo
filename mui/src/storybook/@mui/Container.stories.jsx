import { Container } from '@mui/material'

import { radio, sx } from './utils'

Container.__docgenInfo.description = "- For more see: [`Container`](https://mui.com/api/container)\n- We use only following props:"

const ContainerStory = {
  component: Container,
  title: '@mui/Container',
  argTypes: {
    children: { control: { type: "text" } },
    classes: { table: { disable: true } },
    component: { table: { disable: true } },
    disableGutters: { table: { disable: true } },
    fixed: { table: { disable: true } },
    maxWidth: radio(["xs", "sm", "md", "lg", "xl", "false"], "lg"),
    sx,
  },
}

const Default = args => <Container {...args} />

Default.args = {
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas risus et justo viverra dapibus. Etiam ullamcorper metus ac tellus varius aliquam. Nam tincidunt eu quam in pretium. Maecenas a justo sit amet orci vestibulum semper. Vestibulum nec ullamcorper lectus. Morbi nulla nibh, bibendum ac purus at, eleifend tempor nisi. Ut aliquet nulla tempor massa efficitur, rutrum commodo metus iaculis. Duis vulputate elit at libero aliquam tincidunt."
}

export { ContainerStory as default, Default } 
