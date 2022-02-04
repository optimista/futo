import { TextField } from '@mui/material'

import { radio, sx } from './utils'

TextField.__docgenInfo.description = "- For more see: [`TextField`](https://mui.com/api/text-field)\n- We use only following props:"

const TextFieldStory = {
  component: TextField,
  title: '@mui/TextField',
  args: {
    helperText: 'helperText',
    label: 'label',
    placeholder: 'fill me in...',
  },
  argTypes: {
    autoComplete: { table: { disable: true } },
    autoFocus: { table: { defaultValue: { summary: "false" } } },
    classes: { table: { disable: true } },
    color: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    disabled: { table: { disable: true } },
    error: { table: { defaultValue: { summary: "false" } } },
    FormHelperTextProps: { table: { disable: true } },
    fullWidth: { table: { disable: true } },
    helperText: { control: { type: "text" } },
    id: { table: { disable: true } },
    InputLabelProps: { table: { disable: true } },
    inputProps: { control: { type: null } },
    InputProps: { control: { type: null }, description: "Props applied to the Input element. It will be a [`FilledInput`](http://mui.com/api/filled-input/), [`OutlinedInput`](http://mui.com/api/outlined-input/) or [`Input`](http://mui.com/api/input/) component depending on the `variant` prop value." },
    inputRef: { control: { type: null } },
    label: { control: { type: "text" } },
    margin: { table: { defaultValue: { summary: "'normal'" } } },
    maxRows: { control: { type: "number" } },
    minRows: { table: { disable: true } },
    multiline: { table: { defaultValue: { summary: false } } },
    onKeyDown: { control: { type: null }, description: "Optional keydown handler", table: { type: { summary: "func" } } },
    onMouseDown: { control: { type: null }, description: "Optional mousedown handler", table: { type: { summary: "func" } } },
    required: { table: { disable: true } },
    rows: { table: { disable: true } },
    select: { table: { disable: true } },
    SelectProps: { table: { disable: true } },
    size: { table: { disable: true } },
    sx,
    type: radio(["email", "password", "text"], "text"),
    value: { control: { type: "text" } },
    variant: { table: { disable: true } },
  },
  decorators: [
    (Story) => (<div style={{ minWidth: 400, textAlign: "center" }}>
      <Story />
    </div>)
  ]
}

const Default = args => <TextField {...args} />
const Error = Default.bind({});
const Multiline = Default.bind({});

Error.args = {
  error: true
}

Multiline.args = {
  maxRows: 7,
  multiline: true,
  value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices metus ex, a lobortis purus aliquet quis. Nam ac fermentum sapien, eu pretium lacus. Praesent non erat sed lorem posuere faucibus. Aliquam varius mi id placerat auctor. Aenean at sem felis. Vivamus gravida consectetur varius. Vivamus sed neque ultricies sapien ornare fringilla. Donec ac leo ullamcorper, auctor ante et, interdum libero. Donec pulvinar dolor felis, a condimentum purus faucibus vel. Vestibulum tristique tincidunt nibh, a condimentum magna facilisis consectetur. Integer velit leo, commodo nec facilisis nec, porta a mauris. Suspendisse egestas varius massa, at rutrum elit auctor in."
}

export { TextFieldStory as default, Default, Error, Multiline } 
