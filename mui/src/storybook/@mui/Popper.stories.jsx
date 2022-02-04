import { Person } from '@mui/icons-material'
import { Fade, IconButton, MenuItem, MenuList, Paper, Popper } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

Popper.__docgenInfo.description = "- For more see: [`Popper`](https://mui.com/api/popper)\n- We use only following props:"

const PopperStory = {
  component: Popper,
  title: '@mui/Popper',
  args: {
    open: true,
    transition: true
  },
  argTypes: {
    anchorEl: { control: { type: null } },
    children: { control: { type: null } },
    container: { table: { disable: true } },
    disablePortal: { table: { disable: true } },
    keepMounted: { table: { disable: true } },
    modifiers: { control: { type: null } },
    popperRef: { table: { disable: true } },
    popperOptions: { table: { disable: true } },
    transition: { control: { type: null } },
  },
  decorators: [
    Story => {
      const [anchorEl, setAnchorEl] = useState(null), ref = useRef(null);
      useEffect(() => setAnchorEl(ref.current), [ref]);
      return (
        <div style={{ alignItems: "center", display: "flex", height: 240 }}>
          <IconButton onClick={() => setAnchorEl(anchorEl => anchorEl ? null : ref.current)} ref={ref}><Person /></IconButton>
          { anchorEl && <Story anchorEl={anchorEl} />}
        </div>
      )
    },
  ],
  parameters: { docs: { transformSource: src => src.replace('Popper', 'Popper anchorEl={anchorEl}') } },
}

const Default = (args, Story) =>
  <Popper {...args} anchorEl={Story.anchorEl} disablePortal>
    {({ TransitionProps }) =>
      <Fade {...TransitionProps}>
        <Paper>
          <MenuList>
            <MenuItem>Item #1</MenuItem>
            <MenuItem>Item #2</MenuItem>
            <MenuItem>Item #3</MenuItem>
          </MenuList>
        </Paper>
      </Fade>
    }
  </Popper>
  
    Default.parameters = { docs: { transformSource: src => src.replace('/>', '>\n  {({ TransitionProps }) =>\n    <Fade {...TransitionProps}>\n      <Paper>\n        <MenuList>\n          <MenuItem>Item #1</MenuItem>\n          <MenuItem>Item #2</MenuItem>\n          <MenuItem>Item #3</MenuItem>\n        </MenuList>\n      </Paper>\n    </Fade>\n  }\n</Popper>') } };

const WithoutTransition = (args, Story) =>
  <Popper {...args} anchorEl={Story.anchorEl} disablePortal>
    <Paper>
      <MenuList>
        <MenuItem>Item #1</MenuItem>
        <MenuItem>Item #2</MenuItem>
        <MenuItem>Item #3</MenuItem>
      </MenuList>
    </Paper>
  </Popper>

WithoutTransition.args = {
  transition: false 
}

export { PopperStory as default, Default, WithoutTransition } 
