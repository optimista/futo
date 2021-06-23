const presets = [
  [
    "next/babel",
    {
      "preset-env": {},
      "transform-runtime": {},
      "styled-jsx": {},
      "class-properties": {}
    }
  ]
];

const plugins = [
  [
    'babel-plugin-import',
    {
      libraryName: '@material-ui/core',
      // Use "'libraryDirectory': 'esm'," if your bundler does support ES modules
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'core',
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@material-ui/icons',
      // Use "'libraryDirectory': 'esm'," if your bundler does support ES modules
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'icons',
  ],
];

module.exports = { plugins, presets };
