import { useContext } from 'react'

import { TContext } from 'core/utils/i18n/TProvider'

const useDict = () => useContext(TContext);

export default useDict;
