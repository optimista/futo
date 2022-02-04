import { PageLayout } from 'core/layouts'

const PageLayoutStory = {
  component: PageLayout,
  title: 'core/layouts/PageLayout',
  argTypes: {
    children: { control: { type: "text" } },
    maxWidth: { table: { defaultValue: { summary: "lg" } } }
  }
}

const Default = args => <PageLayout {...args} />;

Default.args = {
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac laoreet libero. Aenean a placerat quam. In hac habitasse platea dictumst. Proin quis nisi aliquet, pellentesque orci eu, cursus nunc. Sed molestie maximus tortor, vitae tristique diam accumsan eu. Ut feugiat mi in mi pellentesque dictum. Cras consequat porta fermentum. Maecenas at diam tortor. Nunc fermentum rhoncus urna, ut faucibus magna convallis et. Nam tincidunt eu arcu ac tempus." 
};

export { PageLayoutStory as default, Default } 
