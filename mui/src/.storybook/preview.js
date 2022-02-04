import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import * as NextImage from "next/image";

import { theme } from '../app/core/utils'

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

const withThemeProvider = (Story, context) => {
  return (
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story {...context} />
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

export const decorators = [withThemeProvider];

export const parameters = {
  controls: { expanded: true, sort: 'requiredFirst'},
  docs: { source: { excludeDecorators: true } },
  layout: 'centered',
  options: { storySort: { order: ['*', '@mui'] } }
};
