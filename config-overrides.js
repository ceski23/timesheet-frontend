/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const { override, addWebpackAlias } = require('customize-cra');
const { addReactRefresh } = require('customize-cra-react-refresh');

module.exports = override(
  addReactRefresh({ disableRefreshCheck: true }),

  addWebpackAlias({
    lodash: 'lodash-es',
  }),
);
