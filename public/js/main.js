document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', handleSearch);
});

async function handleSearch(event) {
  event.preventDefault();
  const keyword = document.getElementById('keyword').value;
  const country = document.getElementById('country').value;
  
  try {
    const response = await fetch(`/api/ads/search?keyword=${encodeURIComponent(keyword)}&country=${encodeURIComponent(country)}`);
    const ads = await response.json();
    displayAds(ads);
  } catch (error) {
    console.error('Error al buscar anuncios:', error);
  }
}

function displayAds(ads) {
  const container = document.getElementById('ads-container');
  if (!ads || ads.length === 0) {
    container.innerHTML = '<p>No se encontraron anuncios.</p>';
    return;
  }
  container.innerHTML = ads.map(ad => `
    <div class="ad-card">
      <h2>${ad.name || 'Sin título'}</h2>
      <p>${ad.body || 'Sin descripción'}</p>
      <p>Página: ${ad.pageInfo.name}</p>
      <h3>Insights:</h3>
      <ul>
        <li>Impresiones: ${ad.insights.impressions || 'N/A'}</li>
        <li>Clics: ${ad.insights.clicks || 'N/A'}</li>
        <li>Gasto: ${ad.insights.spend || 'N/A'} ${ad.insights.currency}</li>
        <li>CTR: ${ad.insights.ctr}</li>
        <li>CPC: ${ad.insights.cpc} ${ad.insights.currency}</li>
      </ul>
      <div class="ad-creative">
        ${ad.creative.imageUrl ? `<img src="${ad.creative.imageUrl}" alt="Ad Creative">` : ''}
        ${ad.creative.videoId ? `<video controls><source src="https://www.facebook.com/ads/archive/video/v2/?id=${ad.creative.videoId}" type="video/mp4"></video>` : ''}
      </div>
      <p>Fecha de inicio: ${new Date(ad.startDate).toLocaleDateString()}</p>
      <p>Fecha de fin: ${ad.endDate ? new Date(ad.endDate).toLocaleDateString() : 'En curso'}</p>
      <a href="${ad.snapshotUrl}" target="_blank">Ver anuncio en Facebook</a>
    </div>
  `).join('');
}