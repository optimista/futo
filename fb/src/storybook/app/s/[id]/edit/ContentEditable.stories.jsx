import { ContentEditable } from 'app/s/[id]/edit/page'

const ContentEditableStory = {
  component: ContentEditable,
  title: 'app/s/[id]/edit/ContentEditable',
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
