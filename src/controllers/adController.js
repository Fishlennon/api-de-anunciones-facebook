const metaApiService = require('../services/metaApiService');
const Ad = require('../models/adModel');

exports.getPopularAds = async (req, res) => {
  try {
    const popularAdsData = await metaApiService.getPopularAds();
    const popularAds = popularAdsData.map(adData => Ad.fromApiResponse(adData));
    
    const formattedAds = popularAds.map(ad => ({
      id: ad.id,
      name: ad.name,
      insights: ad.insights,
      targeting: ad.getSegmentationSummary(),
      isPerforming: ad.isPerforming()
    }));

    res.json(formattedAds);
  } catch (error) {
    console.error('Error al obtener anuncios populares:', error);
    res.status(500).json({ error: 'Error al obtener anuncios populares' });
  }
};