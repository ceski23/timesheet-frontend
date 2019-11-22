/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const ReactRefreshPlugin = require('react-refresh-webpack-plugin');
const { ESLINT_MODES } = require('@craco/craco');

module.exports = {
  eslint: {
    mode: ESLINT_MODES.file,
  },
  babel: {
    plugins: [
      require.resolve('react-refresh/babel'),
    ],
  },
  webpack: {
    plugins: [
      new ReactRefreshPlugin(),
    ],
  },
};
