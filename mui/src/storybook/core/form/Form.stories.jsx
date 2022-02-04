import { useModel } from '@futo-ui/hooks'

import { Form } from 'core/form'

const FormStory = {
  component: Form,
  title: 'core/form/Form',
  argTypes: {
    actions: { control: { type: null } },
    children: { control: { type: null } },
    model: { control: { type: null } }
  }
}

const Default = args => {
  const model = useModel({ email: "", password: "" });
  return <Form model={model} {...args} />
}

export { FormStory as default, Default } 
