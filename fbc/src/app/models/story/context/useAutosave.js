import { useContext } from 'react'

import { AutosaveContext } from 'models/story/context'

const useAutosave = () => useContext(AutosaveContext);

export default useAutosave;
