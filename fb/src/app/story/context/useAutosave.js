import { useContext } from 'react'

import { AutosaveContext } from 'story/context'

const useAutosave = () => useContext(AutosaveContext);

export default useAutosave;
