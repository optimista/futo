import { useContext } from 'react'

import { DispatchContext } from 'story/context/DispatchProvider'

const useDispatch = () => useContext(DispatchContext);

export default useDispatch;
