import { AutosaveContext } from 'models/story/context'

const AutosaveProvider = ({ children, ...props }) => <AutosaveContext.Provider {...props}>{children}</AutosaveContext.Provider>

export default AutosaveProvider;
