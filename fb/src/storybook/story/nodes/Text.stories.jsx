import { StoreProvider } from 'story/context'
import { Text } from 'story/nodes'

const TextStory = {
  component: Text,
  title: 'story/nodes/Text',
}

const Default = args =>
  <StoreProvider value={{ story: { nodes: { "x1": { content: "Node #1" } } } }}>
    <Text {...args} />
  </StoreProvider>

Default.args = {
  id: "x1"
}

export { TextStory as default, Default } 
