import { Skeleton } from '@mui/material'

import { l, useDict, useLocale } from 'core/utils/i18n'

const T = ({ dict: argDict, k, lines = 1, ...props }) => {
  const dict = argDict || useDict(), locale = useLocale();
  return locale ? l(k, dict, locale) : <>{[...Array(lines).keys()].map((_, k) => <Skeleton key={k} {...props} />)}</>;
}

export default T;
