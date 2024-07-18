const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;
const Ad = bizSdk.Ad;

const accessToken = process.env.META_ACCESS_TOKEN;
const adAccountId = process.env.META_AD_ACCOUNT_ID;

const api = bizSdk.FacebookAdsApi.init(accessToken);

exports.getPopularAds = async () => {
  const adAccount = new AdAccount(adAccountId);

  try {
    const ads = await adAccount.getAds([
      'ad_id',
      'name',
      'campaign',
      'adset',
      'creative',
      'targeting',
    ], {
      limit: 50,
      sort: 'reach_descending',
    });

    const adsWithInsights = await Promise.all(ads.map(async (ad) => {
      const insights = await ad.getInsights([
        'impressions',
        'clicks',
        'spend',
        'reach',
        'ctr',
        'cpc',
        'frequency'
      ]);

      return {
        id: ad.id,
        name: ad.name,
        campaign: ad.campaign,
        adset: ad.adset,
        creative: ad.creative,
        targeting: ad.targeting,
        insights: insights[0] // Asumiendo que obtenemos insights para un solo período de tiempo
      };
    }));

    return adsWithInsights;
  } catch (error) {
    console.error('Error al obtener anuncios:', error);
    throw error;
  }
};