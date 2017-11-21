const config = require('@chantelle/eslint-plugin-chantelle').configs.legacy //eslint-disable-line import/no-commonjs

module.exports = Object.assign({}, config, {  //eslint-disable-line import/no-commonjs,fp/no-mutation
  "rules": Object.assign({}, config.rules || {}, {
    "radix": 0
  }),
  "globals": Object.assign({}, config.globals || {}, {
      "qshopFetch": true,
      "$": true,
      "$$": true, 
      "$RF": true,
      "Ajax": true,
      "FB": true,
      "get_separate_save_methods_function": true,
      "Effect": true,
      "get_totals_element": true,
      "DATA_REACT": true,
      "DATA_UI": true,
      "_tcfn_": true,
      "jQuery": true,
      "tc_var_name": true,
      "payment": true,
      "google": true,
      "getFormKey": true,
      "MarkerClusterer": true,
      "activeColor": true,
      "tc_vars": true,
      "$lookbookPage": true,
      "emailMsgs": true,
      "maxRecip": true,
      "$emailShare": true,
      "sameShippingSelect": true,
      "get_save_billing_function": true,
      "urlSaveBilling": true,
      "urlSetMethods": true,
      "updatePayments": true,
      "customerAdressesData": true,
      "fillAddressFields": true,
      "defaultBillingRegion": true,
      "countryRegions": true,
      "defaultShippingRegion": true,
      "link": true
  })
})
