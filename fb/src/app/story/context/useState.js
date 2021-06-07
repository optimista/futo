import { useContext } from 'react'

import { StoreContext } from 'story/context'

const useState = () => useContext(StoreContext);

export default useState;
