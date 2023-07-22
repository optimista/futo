import { Button } from '@mui/material'
import { ImageOutlined } from '@mui/icons-material'

import { IconButton, ImageInput } from 'core'

const ImageInputStory = {
  component: ImageInput,
  title: 'core/ImageInput',
  argTypes: {
    children: { control: { type: "text" } },
    component: { options: ["Button", "IconButton"], mapping: { "Button": Button, "IconButton": IconButton }, table: { defaultValue: { summary: "Button" }, type: { summary: "Button | IconButton" } } },
  }
}

const Default = args => <ImageInput {...args} />
const Icon = Default.bind({});

Default.args = {
  children: "Upload"
}

Icon.args = {
  children: <ImageOutlined />,
  component: IconButton,
}

Icon.parameters = {
  docs: { source: { transform: src => src.replace('() => {}', "IconButton").replace('[object Object]', 'ImageOutlined') } }
}

export { ImageInputStory as default, Default, Icon } 
