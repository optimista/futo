const path = require('path'),
      toPath = filePath => path.join(process.cwd(), filePath);

module.exports = {
  addons: ['@storybook/addon-essentials', '@storybook/addon-links'],
  framework: { name: '@storybook/nextjs', options: {} },
  staticDirs: ['../public', '../public/storybook'],
  stories: [
    "../storybook/**/*.stories.mdx",
    "../storybook/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  babel: async options => {
    options.plugins.push(['babel-plugin-import', {
      libraryName: '@mui/material',
      libraryDirectory: '',
      camel2DashComponentName: false
    }, 'core'], ['babel-plugin-import', {
      libraryName: '@mui/icons-material',
      libraryDirectory: '',
      camel2DashComponentName: false
    }, 'icons']);
    return options;
  },
  webpackFinal: async config => {
    config.module.rules[0].exclude = modulePath => /node_modules/.test(modulePath) && !/node_modules\/@mui\/base/.test(modulePath) && !/node_modules\/@mui\/material/.test(modulePath) && !/node_modules\/@mui\/lab/.test(modulePath);
    config.resolve.alias.app = path.resolve("./app");
    config.resolve.alias.storybook = path.resolve("./storybook");
    config.resolve.modules.push(path.resolve("./base"));
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
          'next/image': toPath('./.storybook/NextImage')
        }
      }
    };
  },
  docs: {
    autodocs: true
  }
};
