import { FocusLayout } from 'core/layouts'

const focusLayoutDecorator = Story => 
  <FocusLayout maxWidth="xs"><Story /></FocusLayout>

export { focusLayoutDecorator };
