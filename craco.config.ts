/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const ReactRefreshPlugin = require('react-refresh-webpack-plugin');

module.exports = {
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
