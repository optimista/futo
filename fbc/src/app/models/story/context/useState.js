import { useContext } from 'react'

import { StoreContext } from 'models/story/context'

const useState = () => useContext(StoreContext);

export default useState;
