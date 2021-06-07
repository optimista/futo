import { StoreContext } from 'story/context'

const StoreProvider = ({ children, ...props }) => <StoreContext.Provider {...props}>{children}</StoreContext.Provider>

export default StoreProvider;
