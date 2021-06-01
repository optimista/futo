import { useContext } from 'react'

import { DispatchContext } from 'models/story/context'

const useDispatch = () => useContext(DispatchContext);

export default useDispatch;
