import { CircularProgress, Input } from '@mui/material'
import { Check } from '@mui/icons-material'

Input.__docgenInfo.description = "- For more see: [`Input`](https://mui.com/api/input)\n- We use only following props:"

const InputStory = {
  component: Input,
  title: '@mui/Input',
  argTypes: {
    autoComplete: { table: { disable: true } },
    autoFocus: { table: { disable: true } },
    classes: { table: { disable: true } },
    color: { table: { disable: true } },
    components: { table: { disable: true } },
    componentsProps: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    disabled: { table: { disable: true } },
    disableUnderline: { table: { disable: true } },
    endAdornment: { control: { type: null } },
    error: { table: { disable: true } },
    fullWidth: { table: { disable: true } },
    id: { table: { disable: true } },
    inputComponent: { table: { disable: true } },
    inputProps: { table: { disable: true } },
    inputRef: { table: { disable: true } },
    margin: { table: { disable: true } },
    maxRows: { table: { disable: true } },
    minRows: { table: { disable: true } },
    multiline: { table: { disable: true } },
    name: { table: { disable: true } },
    onChange: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    readOnly: { table: { disable: true } },
    required: { table: { disable: true } },
    rows: { table: { disable: true } },
    startAdornment: { table: { disable: true } },
    sx: { table: { disable: true } },
    type: { table: { disable: true } },
    value: { table: { disable: true } },
  },
}

const Default = args => <Input {...args} />
const Validating = Default.bind({});

Default.args = {
  endAdornment: <Check fontSize="small" /> 
}

Default.parameters = {
  docs: { transformSource: src => src.replace('[object Object]', 'Check') }
}

Validating.args = {
  endAdornment: <CircularProgress size={16} sx={{ ml: "2px", mr: "3px" }} />
}

export { InputStory as default, Default, Validating } 
