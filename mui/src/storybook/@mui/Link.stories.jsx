import { Link } from '@mui/material'

import { radio, sx } from './utils'

Link.__docgenInfo.description = "- For more see: [`Link`](https://mui.com/api/link)\n- We use only following props:"

const LinkStory = {
  component: Link,
  title: '@mui/Link',
  args: {
    href: "/"
  },
  argTypes: {
    children: { control: { type: "text" } },
    classes: { table: { disable: true } },
    component: { table: { disable: true } },
    color: radio(["primary", "textSecondary"], "primary"),
    href: { description: "Specifies the URL of the page that the link goes to", table: { type: { summary: "string" } } },
    sx,
    TypographyClasses: { table: { disable: true } },
    underline: radio(["hover", "none"], "hover"),
    variant: radio(["body2", "h6", "inherit"], "inherit")
  },
}

const Default = ({ children, ...args }) => <Link {...args}>{children}</Link>
const Secondary = Default.bind({});

Default.args = {
  children: "Home",
}

Secondary.args = {
  children: "Forgot your password?",
  color: "textSecondary",
  variant: "body2"
}

export { LinkStory as default, Default, Secondary } 
