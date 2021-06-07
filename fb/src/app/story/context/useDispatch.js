import { useContext } from 'react'

import { DispatchContext } from 'story/context'

const useDispatch = () => useContext(DispatchContext);

export default useDispatch;
