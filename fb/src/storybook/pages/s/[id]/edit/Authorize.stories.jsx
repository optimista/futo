import { withReactContext } from 'storybook-react-context'

import { Loading } from 'core'
import { AuthContext } from 'user/AuthProvider'

import { Authorize } from 'pages/s/[id]/edit'

const AuthorizeStory = {
  component: Authorize,
  title: 'pages/s/[id]/edit/Authorize',
  argTypes: { 
    children: { control: { type: "text" } },
    fallback: { control: { disable: true } },
    if: { control: { type: "boolean" } },
  },
  decorators: [
    withReactContext({
      Context: AuthContext,
      initialState: { isReady: true, uid: "defaultProfileId" },
    }),
  ],
}

const Default = (args, ctx) => { ctx.originalStoryFn.currentArgs = args; return <Authorize {...args} /> }
const Auth = Default.bind({});
const Fallback = Default.bind({});

Default.args = {
  children: "Authorized",
  if: true 
}

Default.parameters = {
  docs: { transformSource: (src, ctx) => src.replace(">", ctx.originalStoryFn.currentArgs.if ? "={true}>" : " if={false}>") },
  nextRouter: { replace: pathname => window.parent.location.href = pathname }
}

Auth.args = {
  children: "Authorized",
  if: auth => auth.uid === "defaultProfileId"
}

Auth.parameters = { docs: { transformSource: src => src.replace("() => {}", "auth => auth.uid === \"defaultProfileId\"") } }

Fallback.args = {
  fallback: <Loading />,
  ready: false
}

Fallback.parameters = { docs: { transformSource: src => src.replace(/\/>}\n/g, "\/>}\n  ready={false}\n") } }

export { AuthorizeStory as default, Default, Auth, Fallback } 
