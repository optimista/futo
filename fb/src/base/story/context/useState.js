import { useContext } from 'react'

import { StoreContext } from 'story/context/StoreProvider'

const useState = () => useContext(StoreContext);

export default useState;
