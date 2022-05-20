import { AspectRatioBox } from 'core'

const AspectRatioBoxStory = {
  component: AspectRatioBox,
  title: 'core/AspectRatioBox',
  args: { children: <div style={{ backgroundColor: "rgba(0, 0, 0, 0.11)" }} /> },
  argTypes: { children: { control: { type: null } } },
  decorators: [ Story => <div style={{ width: 200 }}><Story /></div> ]
}

const Default = args => <AspectRatioBox {...args} />
const High = Default.bind({});
const Wide = Default.bind({});

High.args = {
  ratio: 0.5
}

Wide.args = {
  ratio: 2
}

export { AspectRatioBoxStory as default, Default, High, Wide } 
