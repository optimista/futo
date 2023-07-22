import { Person } from '@mui/icons-material'
import { IconButton, MenuItem } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import { Menu } from 'core'

const MenuStory = {
  component: Menu,
  title: 'core/Menu',
  args: { open: true }, // Default values for the story
  argTypes: {
    anchorEl: { control: { type: null } },
    children: { control: { type: null } }
  },
  decorators: [
    (Story, story) => {
      const { arrow } = story.args, [anchorEl, setAnchorEl] = useState(null), ref = useRef(null);
      useEffect(() => setAnchorEl(ref.current), [ref]);
      return (
        <div style={{ height: 106 + (story.title === "core/Menu" && arrow ? 40 : 0) }}>
          <IconButton ref={ref}><Person /></IconButton>
          { anchorEl && <Story anchorEl={anchorEl} />}
        </div>
      )
    },
  ],
  parameters: { docs: { source: { transform: src => src.replace('Menu', 'Menu anchorEl={anchorEl}') } } }
}

// disablePortal because when switching from story to docs it creates mess (leaves a menu from story opened and floating in docs)
const Default = (args, Story) =>
  <Menu {...args} anchorEl={Story.anchorEl} disablePortal>
    <MenuItem>Item #1</MenuItem>
    <MenuItem>Item #2</MenuItem>
    <MenuItem>Item #3</MenuItem>
  </Menu>

const Start = Default.bind({});
const End = Default.bind({});
const StartArrow = Default.bind({});
const EndArrow = Default.bind({});

StartArrow.args = {
  arrow: true,
  placement: "start"
}

EndArrow.args = {
  arrow: true,
  placement: "end"
}

Start.args = {
  placement: "start"
}

End.args = {
  placement: "end"
}

export { MenuStory as default, Default, Start, End, StartArrow, EndArrow } 
