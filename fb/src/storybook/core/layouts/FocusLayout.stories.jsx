import { FocusLayout } from 'core/layouts'

const FocusLayoutStory = {
  component: FocusLayout,
  title: 'core/layouts/FocusLayout',
  argTypes: {
    children: { control: { type: "text" } },
    maxWidth: { table: { defaultValue: { summary: "lg" } } },
  },
}

const Default = args => <FocusLayout {...args} />

Default.args = {
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget tristique ligula. Praesent vitae arcu at magna lobortis fringilla non vitae erat. Nullam tortor augue, laoreet nec sem id, luctus rhoncus mi. Cras tincidunt bibendum mauris eleifend tristique. Nam vestibulum fringilla neque, id aliquet tortor euismod ut. Proin vel fermentum turpis. Duis eleifend orci laoreet dui consequat fringilla. Maecenas dui justo, tincidunt at felis a, dignissim tempor velit. Curabitur eu diam id dui eleifend condimentum."
} 

export { FocusLayoutStory as default, Default } 
