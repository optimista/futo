import { PostCard } from 'post/PostFeed'
import { AuthContext } from 'user/AuthProvider'

const PostCardStory = {
  component: PostCard,
  title: 'post/PostFeed/PostCard',
  argTypes: { post: { control: { type: null } } },
  parameters: { layout: "padded" },
  decorators: [
    Story => (
      <AuthContext.Provider value={{ profile: { photoURL: "/mockup-avatar.jpg" } }}>
        <Story />
      </AuthContext.Provider>
    )
  ],
}

const Default = args => <PostCard {...args} />

Default.args = {
  post: { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie dignissim quam eget convallis. Cras interdum, velit condimentum congue mollis, neque metus tristique nulla, eu lacinia tortor neque nec nulla. Proin tincidunt iaculis sodales. Nullam non dui vel est elementum tincidunt et a dui. Sed sit amet nisl at ipsum finibus ornare laoreet nec erat. Cras eget dapibus quam. Praesent dui diam, fermentum ac purus ut, egestas efficitur dui. Donec tempus tempor lorem, nec aliquam nibh eleifend eu. Proin vulputate nulla sodales ipsum feugiat fringilla.", profileUsername: "optimista", time: "10 Jan" }
}

export { PostCardStory as default, Default } 
