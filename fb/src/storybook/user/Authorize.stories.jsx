import { RouterContext } from "next/dist/shared/lib/router-context"
import { withReactContext } from 'storybook-react-context'

import { Loading } from 'core'
import { Authorize } from 'user'
import { AuthContext } from 'user/AuthProvider'

const AuthorizeStory = {
  component: Authorize,
  title: 'user/Authorize',
  argTypes: { 
    children: { control: { type: "text" } },
    fallback: { control: { disable: true } }
  },
  decorators: [
    (Story, { args }) => {
      return <RouterContext.Provider value={{ replace: () => { // Because it uses replace function and otherwise we won't have RouterContext
        window.parent.location.href = args.redirect || "/?path=/docs/user-authorize--default"
      } }}><Story /></RouterContext.Provider>
    },
    withReactContext({
      Context: AuthContext,
      initialState: { isReady: true, uid: "defaultProfileId" },
    }),
  ],
}

const Default = args => <Authorize {...args} />
const Fallback = Default.bind({});

Default.args = {
  children: "Authorized",
  uid: "defaultProfileId"
}

Fallback.args = {
  fallback: <Loading />,
  ready: false
}

Fallback.parameters = { docs: { transformSource: src => src.replace(/\/>}\n/g, "\/>}\n  ready={false}\n") } }

export { AuthorizeStory as default, Default, Fallback } 
