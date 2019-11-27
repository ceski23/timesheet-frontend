/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const { whenDev } = require('@craco/craco');
const ReactRefreshPlugin = require('react-refresh-webpack-plugin');

module.exports = {
  babel: {
    plugins: [
      ...whenDev(() => [require.resolve('react-refresh/babel')], []),
    ],
  },
  webpack: {
    plugins: [
      ...whenDev(() => [new ReactRefreshPlugin()], []),
    ],
    alias: {
      lodash: 'lodash-es',
    },
  },
  jest: {
    configure: {
      transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!lodash-es)',
      ],
    },
  },
  plugins: [
    // {
    //   plugin: CracoAlias,
    //   options: {
    //     source: 'options',
    //     aliases: {
    //       lodash: 'lodash-es',
    //     },
    //   },
    // },
  ],
};
