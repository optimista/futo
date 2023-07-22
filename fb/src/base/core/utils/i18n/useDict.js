import { useContext } from 'react'

import { IContext } from 'core/utils/i18n/IProvider'

const useDict = () => useContext(IContext);

export default useDict;
