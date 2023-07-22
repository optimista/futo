const heightDecorator = (Story, { viewMode }) =>
  <div style={{ height: viewMode === 'docs' ? 440 : "100vh", ...(viewMode === 'docs' ? { marginBottom: 16 } : {}), transform: 'scale(1)' }}>
    <Story />
  </div>

const transformDispatch = src => src.replace('() => {}', 'dispatch');
const transformStore = src => src.replace(/\n\s*value={{[\s\S]*?}}\s*>/, " value={state}>");
const transform = src => transformStore(transformDispatch(src));

export { heightDecorator, transform, transformDispatch, transformStore };
