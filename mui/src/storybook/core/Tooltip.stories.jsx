import { Person } from '@mui/icons-material'

import { Tooltip } from 'core'

const TooltipStory = {
  component: Tooltip,
  title: 'core/Tooltip',
  argTypes: {
    children: { control: { type: null } },
    title: { control: { type: "text" }, description: "Tooltip title. Zero-length titles string are never displayed.", type: { summary: "node", required: true } }
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
