const heightDecorator = (Story, { viewMode }) =>
  <div style={{ height: viewMode === 'docs' ? 400 : "100vh", transform: 'scale(1)' }}>
    <Story />
  </div>

const transformDispatch = src => src.replace('() => {}', 'dispatch');
const transformStore = src => src.replace(/\n\s*value={{[\s\S]*?}}\s*>/, " value={state}>");
const transformSource = src => transformStore(transformDispatch(src));

export { heightDecorator, transformDispatch, transformSource, transformStore };
