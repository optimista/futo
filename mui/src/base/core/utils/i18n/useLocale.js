import { useContext } from 'react'

import { LocaleContext } from 'core/utils/i18n/LocaleProvider'

const useLocale = () => useContext(LocaleContext);

export default useLocale;
