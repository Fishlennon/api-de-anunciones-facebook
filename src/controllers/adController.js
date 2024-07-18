const metaApiService = require('../services/metaApiService');

exports.searchAds = async (req, res) => {
  try {
    const { keyword, country } = req.query;
    const ads = await metaApiService.searchAds({ keyword, country });
    
    const formattedAds = await Promise.all(ads.map(async (ad) => {
      const creative = await metaApiService.getAdCreative(ad.id);
      return {
        id: ad.id,
        name: ad.ad_creative_link_title,
        body: ad.ad_creative_body,
        pageInfo: {
          name: ad.page_name,
          id: ad.page_id
        },
        insights: {
          impressions: ad.impressions,
          clicks: ad.clicks,
          spend: ad.spend,
          currency: ad.currency,
          ctr: ad.clicks && ad.impressions ? (ad.clicks / ad.impressions * 100).toFixed(2) + '%' : 'N/A',
          cpc: ad.clicks && ad.spend ? (ad.spend / ad.clicks).toFixed(2) : 'N/A'
        },
        creative: {
          imageUrl: creative?.image_url,
          videoId: creative?.video_id
        },
        startDate: ad.ad_delivery_start_time,
        endDate: ad.ad_delivery_stop_time,
        snapshotUrl: ad.ad_snapshot_url
      };
    }));

    res.json(formattedAds);
  } catch (error) {
    console.error('Error al buscar anuncios:', error);
    res.status(500).json({ error: 'Error al buscar anuncios' });
  }
};