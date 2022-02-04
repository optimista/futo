import { FixedLayout } from 'core/layouts'

const FixedLayoutStory = {
  component: FixedLayout,
  title: 'core/layouts/FixedLayout',
  argTypes: {
    children: { control: { type: "text" } },
    toolbarLeft: { control: { type: "text" } },
    toolbarRight: { control: { type: "text" } }
  },
  decorators: [
    (Story, { viewMode }) =>
      <div style={{ height: viewMode === 'docs' ? 488 : "100vh", transform: 'scale(1)' }}>
        <Story />
      </div>
  ],
  parameters: { layout: "fullscreen" }
}

const Default = args => <FixedLayout {...args} />

export { FixedLayoutStory as default, Default } 