document.addEventListener('DOMContentLoaded', () => {
    fetchPopularAds();
  });
  
  async function fetchPopularAds() {
    try {
      const response = await fetch('/api/ads/popular');
      const ads = await response.json();
      displayAds(ads);
    } catch (error) {
      console.error('Error al obtener anuncios:', error);
    }
  }
  
  function displayAds(ads) {
    const container = document.getElementById('ads-container');
    if (!ads || ads.length === 0) {
      container.innerHTML = '<p>No se encontraron anuncios.</p>';
      return;
    }
    container.innerHTML = ads.map(ad => `
      <div class="ad-card ${ad.isPerforming ? 'performing' : ''}">
        <h2>${ad.name}</h2>
        <p>ID: ${ad.id}</p>
        <h3>Insights:</h3>
        <ul>
          <li>Impresiones: ${ad.insights.impressions || 'N/A'}</li>
          <li>Clics: ${ad.insights.clicks || 'N/A'}</li>
          <li>Gasto: ${ad.insights.spend || 'N/A'}</li>
          <li>Alcance: ${ad.insights.reach || 'N/A'}</li>
          <li>CTR: ${ad.insights.ctr || 'N/A'}</li>
          <li>CPC: ${ad.insights.cpc || 'N/A'}</li>
          <li>Frecuencia: ${ad.insights.frequency || 'N/A'}</li>
        </ul>
        <h3>Segmentación:</h3>
        <pre>${JSON.stringify(ad.targeting, null, 2)}</pre>
        <p>Rendimiento: ${ad.isPerforming ? 'Bueno' : 'Necesita mejorar'}</p>
      </div>
    `).join('');
  }