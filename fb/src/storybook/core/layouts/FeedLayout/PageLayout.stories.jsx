import { PageLayout } from 'core/layouts/FeedLayout'
import { AuthContext } from 'user/AuthProvider'

import { heightDecorator } from 'storybook/story/utils'

const PageLayoutStory = {
  component: PageLayout,
  title: 'core/layouts/FeedLayout/PageLayout',
  argTypes: {
    children: { control: { type: "text" } },
    maxWidth: { table: { defaultValue: { summary: "md" } } },
  },
  decorators: [
    heightDecorator,
    Story => (
      <AuthContext.Provider value={{ isReady: true, isLoggedIn: true, profile: { photoURL: "/mockup-avatar.jpg" } }}>
        <Story />
      </AuthContext.Provider>
    )
  ],
  parameters: { layout: "fullscreen" }
}

const Default = args => <PageLayout {...args} />

Default.args = {
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget tristique ligula. Praesent vitae arcu at magna lobortis fringilla non vitae erat. Nullam tortor augue, laoreet nec sem id, luctus rhoncus mi. Cras tincidunt bibendum mauris eleifend tristique. Nam vestibulum fringilla neque, id aliquet tortor euismod ut. Proin vel fermentum turpis. Duis eleifend orci laoreet dui consequat fringilla. Maecenas dui justo, tincidunt at felis a, dignissim tempor velit. Curabitur eu diam id dui eleifend condimentum."
}

export { PageLayoutStory as default, Default } 
