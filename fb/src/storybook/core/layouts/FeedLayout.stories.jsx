import { FeedLayout } from 'core/layouts'

const FeedLayoutStory = {
  component: FeedLayout,
  title: 'core/layouts/FeedLayout',
  argTypes: { children: { control: { type: "text" } } },
  decorators: [
    (Story, { viewMode }) =>
      <div style={{ height: viewMode === 'docs' ? 488 : "100vh", transform: 'scale(1)' }}>
        <Story />
      </div>
  ],
  parameters: { layout: "fullscreen" }
}

const Default = args => <FeedLayout {...args} />

export { FeedLayoutStory as default, Default } 
