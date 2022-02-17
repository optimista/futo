import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import * as NextImage from "next/image";

import { theme } from '../app/core/utils'
import { LocaleProvider } from '../app/core/utils/i18n'

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

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
  options: { storySort: { order: ['*', '@mui'] } }
};
