import { ContentEditable } from 'pages/s/[id]/edit'

const ContentEditableStory = {
  component: ContentEditable,
  title: 'pages/s/[id]/edit/Caret/ContentEditable',
  argTypes: {
    html: { table: { defaultValue: { summary: "" } } },
    innerRef: { control: { type: null } }
  }
}

const Default = args => <ContentEditable {...args} />

Default.args = {
  placeholder: "Start writing..."
}

export { ContentEditableStory as default, Default } 
