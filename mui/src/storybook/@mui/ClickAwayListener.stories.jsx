import { ClickAwayListener } from '@mui/material'

ClickAwayListener.__docgenInfo.description = "- For more see: [`ClickAwayListener`](https://mui.com/api/click-away-listener)\n- We use only following props:"

const ClickAwayListenerStory = {
  component: ClickAwayListener,
  title: '@mui/ClickAwayListener',
  argTypes: {
    children: { control: { type: "text" }, table: { type: { summary: "node" } } },
    disableReactTree: { table: { disable: true } },
    mouseEvent: { table: { disable: true } },
    touchEvent: { table: { disable: true } },
  }
}

const Default = ({ children, ...args }) => <ClickAwayListener {...args}><span>{children}</span></ClickAwayListener>

Default.args = {
  children: "Click Away!",
  onClickAway: () => console.log("Click Away!") 
}

Default.parameters = {
  docs: { transformSource: src => src.replace("{}", "console.log(\"Click Away!\")") }
}

export { ClickAwayListenerStory as default, Default } 
