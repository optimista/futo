import { StoryNotification } from 'pages/s/[id]/edit'

const StoryNotificationStory = {
  component: StoryNotification,
  title: 'pages/s/[id]/edit/StoryNotification',
  argTypes: { children: { control: { type: "text" } } }
}

const Default = args => <StoryNotification {...args} />

Default.args = {
  children: "Saved.",
  show: true
}

export { StoryNotificationStory as default, Default } 
