const { legacy: legacyConfig } = require('@chantelle/eslint-plugin-chantelle')

const { globals, rules, ...config } = legacyConfig
const safeObject = object => object || {}

module.exports = {
  ...config,
  ...{
    rules: {
      ...safeObject(rules),
      ...{
        radix: 0,
      },
    },
    globals: {
      ...safeObject(globals),
      ...{
        qshopFetch: true,
        $: true,
        $$: true,
        $RF: true,
        Ajax: true,
        FB: true,
        get_separate_save_methods_function: true,
        Effect: true,
        get_totals_element: true,
        DATA_REACT: true,
        DATA_UI: true,
        _tcfn_: true,
        jQuery: true,
        tc_var_name: true,
        payment: true,
        google: true,
        getFormKey: true,
        MarkerClusterer: true,
        activeColor: true,
        tc_vars: true,
        $lookbookPage: true,
        emailMsgs: true,
        maxRecip: true,
        $emailShare: true,
        sameShippingSelect: true,
        get_save_billing_function: true,
        urlSaveBilling: true,
        urlSetMethods: true,
        updatePayments: true,
        customerAdressesData: true,
        fillAddressFields: true,
        defaultBillingRegion: true,
        countryRegions: true,
        defaultShippingRegion: true,
        link: true,
      },
    },
  },
}
