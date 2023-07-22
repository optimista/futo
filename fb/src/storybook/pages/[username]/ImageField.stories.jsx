import { ImageField } from 'pages/[username]/ProfilePage'

const ImageFieldStory = {
  component: ImageField,
  title: 'pages/[username]/ImageField',
  args: { children: <div style={{ backgroundColor: "rgba(0, 0, 0, 0.11)" }} /> },
  argTypes: { children: { control: { type: "text" } } },
}

const Default = args => <ImageField {...args} />

Default.args = {
  children: "Upload"
}

export { ImageFieldStory as default, Default } 
