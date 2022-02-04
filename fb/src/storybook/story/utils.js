const transformDispatch = src => src.replace('() => {}', 'dispatch');
const transformStore = src => src.replace(/\n\s*value={{[\s\S]*?}}\s*>/, " value={state}>");
const transformSource = src => transformStore(transformDispatch(src));

export { transformDispatch, transformSource, transformStore };
