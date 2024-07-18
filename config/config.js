require('dotenv').config();

module.exports = {
  meta: {
    accessToken: process.env.META_ACCESS_TOKEN,
    appId: process.env.META_APP_ID,
    appSecret: process.env.META_APP_SECRET,
    adAccountId: process.env.META_AD_ACCOUNT_ID
  },
  server: {
    port: process.env.PORT || 3000
  }
};