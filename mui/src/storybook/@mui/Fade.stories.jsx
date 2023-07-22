import { Fade } from '@mui/material'

Fade.__docgenInfo = { description: "- For more see: [`Fade`](https://mui.com/api/fade)\n- We use only following props:" }

const FadeStory = {
  component: Fade,
  title: '@mui/Fade',
  argTypes: {
    addEndListener: { table: { disable: true } },
    appear: { table: { disable: true } },
    children: { control: { type: "text" }, table: { type: { summary: "node" } } },
    easing: { table: { disable: true } },
    in: { table: { disable: true } },
    timeout: { table: { disable: true } },
  },
}

const Default = ({ children, ...args }) => <Fade in {...args}><span>{children}</span></Fade>

Default.args = {
  children: "Fade" 
}

export { FadeStory as default, Default } 
