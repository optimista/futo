import { Person } from '@mui/icons-material'
import { Tooltip } from '@mui/material'

Tooltip.__docgenInfo.description = "- For more see: [`Tooltip`](https://mui.com/api/tooltip)\n- We use only following props:"

const TooltipStory = {
  component: Tooltip,
  title: '@mui/Tooltip',
  argTypes: {
    arrow: { table: { disable: true } },
    children: { control: { type: null }, table: { type: { summary: "node" } }},
    classes: { table: { disable: true } },
    components: { table: { disable: true } },
    componentsProps: { table: { disable: true } },
    describeChild: { table: { disable: true } },
    disableFocusListener: { table: { disable: true } },
    disableHoverListener: { table: { disable: true } },
    disableInteractive: { table: { disable: true } },
    disableTouchListener: { table: { disable: true } },
    enterDelay: { table: { defaultValue: { summary: 500 } } },
    enterNextDelay: { table: { defaultValue: { summary: 500 } } },
    enterTouchDelay: { table: { disable: true } },
    followCursor: { table: { disable: true } },
    id: { table: { disable: true } },
    leaveDelay: { table: { disable: true } },
    leaveTouchDelay: { table: { disable: true } },
    onClose: { table: { disable: true } },
    onOpen: { table: { disable: true } },
    open: { table: { disable: true } },
    placement: { table: { disable: true } },
    PopperComponent: { table: { disable: true } },
    PopperProps: { description: "Props applied to the [`Popper`](http://mui.com/api/popper/) element.", table: { defaultValue: { summary: "{ disablePortal: true }" } } },
    sx: { table: { disable: true } },
    title: { control: { type: "text" } },
    TransitionComponent: { control: { type: null }, description: "The component used for the transition. [Follow this guide](https://mui.com/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.", table: { defaultValue: { summary: "Fade" } } },
    TransitionProps: { table: { defaultValue: { summary: "{ timeout: 100 }" } } },
  }
}

const Default = args => <Tooltip {...args}><Person /></Tooltip>;

Default.args = {
  title: "Account" 
};

Default.parameters = {
  docs: { transformSource: src => src.replace('[object Object]', 'Person') }
}

export { TooltipStory as default, Default } 
