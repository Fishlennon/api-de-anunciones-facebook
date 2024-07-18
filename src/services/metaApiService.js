const axios = require('axios');

const FB_API_VERSION = 'v16.0';
const FB_API_BASE_URL = `https://graph.facebook.com/${FB_API_VERSION}`;

exports.searchAds = async (searchParams) => {
  try {
    const response = await axios.get(`${FB_API_BASE_URL}/ads_archive`, {
      params: {
        access_token: process.env.META_ACCESS_TOKEN,
        search_terms: searchParams.keyword,
        ad_type: 'ALL',
        ad_reached_countries: searchParams.country,
        fields: 'id,ad_creative_body,ad_creative_link_caption,ad_creative_link_description,ad_creative_link_title,ad_delivery_start_time,ad_delivery_stop_time,ad_snapshot_url,currency,funding_entity,page_id,page_name,spend,impressions,clicks',
        limit: 50
      }
    });

    return response.data.data;
  } catch (error) {
    console.error('Error al buscar anuncios:', error);
    throw error;
  }
};

exports.getAdCreative = async (adId) => {
  try {
    const response = await axios.get(`${FB_API_BASE_URL}/${adId}`, {
      params: {
        access_token: process.env.META_ACCESS_TOKEN,
        fields: 'creative{body,image_url,video_id}'
      }
    });

    return response.data.creative;
  } catch (error) {
    console.error('Error al obtener el creativo del anuncio:', error);
    throw error;
  }
};