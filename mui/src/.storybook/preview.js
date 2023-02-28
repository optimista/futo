import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import { RouterContext } from "next/dist/shared/lib/router-context";

import { theme } from '../base/core/utils'
import { LocaleProvider } from '../base/core/utils/i18n'

export const decorators = [
  (Story, context) => {
    return (
      <Emotion10ThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocaleProvider>
            <Story {...context} />
          </LocaleProvider>
        </ThemeProvider>
      </Emotion10ThemeProvider>
    );
  }
];

export const parameters = {
  controls: { expanded: true, sort: 'requiredFirst'},
  docs: { source: { excludeDecorators: true } },
  layout: 'centered',
  nextRouter: { Provider: RouterContext.Provider },
  options: { storySort: { order: ['*', '@mui'] } }
};
