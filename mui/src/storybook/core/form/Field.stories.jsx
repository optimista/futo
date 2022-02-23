import { useModel } from '@futo-ui/hooks'

import { Field, Form } from 'core/form'

const FieldStory = {
  component: Field,
  title: 'core/form/Field',
  argTypes: {
    label: { control: { type: "text" } }
  },
  decorators: [
    Story => {
      const model = useModel({ email: "" });
      return <Form model={model} sx={{ minWidth: 400 }}><Story /></Form>
    }
  ],
}

const Default = args => <Field {...args} />

Default.args = {
  name: "email"
};

export { FieldStory as default, Default } 
