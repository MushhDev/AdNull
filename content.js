// Selectores ampliados para cubrir la mayoría de anuncios visibles y overlays
const adSelectors = [
  // Clases e IDs comunes
  '.ad', '#ads', '.adsbygoogle', '[class*="sponsor"]', '[id^="ad_"]',
  '[class*="ad-"]', '[id*="google_ads"]', '[class^="ads-"]', '.banner-ad',
  '#sponsored', '.sponsored', 'iframe[src*="ads"]', 'div[id^="div-gpt-ad"]',
  '[data-ad]', 'ins.adsbygoogle', '.commercial', '.ad-container',
  '.adverts', '.advertisement', '[class*="adslot"]', '[class*="adbox"]',
  'img[src*="ads"]', 'a[href*="ads"]',

  // Overlays y popups que suelen ser publicidad
  '.ad-overlay', '.adpopup', '.popup-ad', '.video-ads', '.ad-wrapper',
  '.adblock-detected', '.ad-placeholder', '.ads-overlay',

  // Anuncios en reproductores multimedia comunes
  '.ytp-ad-module', '.ytp-ad-player-overlay', '.ytp-ad-text', // YouTube
  '.player-ads', '.vjs-ad-block', '.vjs-ad-overlay', // Video.js players
  '.twitch-ad', '.ad-slot', '.ad-slot-container',

  // Anuncios en Crunchyroll, Twitch y otros
  '.cr-ad-container', '.twitch-player-ad-overlay', '.twitch-ad-container',

  // Elementos con atributos que suelen usarse para anuncios
  '[data-google-query-id]', '[data-ad-client]', '[data-ad-slot]',
  '[aria-label="Advertisement"]', '[aria-label="Ads"]',

  // Imágenes y iframes sospechosos
  'img[src*="ads"]', 'iframe[src*="ads"]', 'iframe[src*="doubleclick"]',

  // Anuncios en redes sociales
  '.sponsored-post', '.promoted-content', '.ad-post', '.ad-social'
];

// Función que elimina elementos si siguen presentes en el DOM y no son cruciales para UX
function removeAds() {
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (el.isConnected) {
        // Evitar eliminar nodos importantes (ejemplo: evitar eliminar body o html)
        if (el.tagName.toLowerCase() !== 'body' && el.tagName.toLowerCase() !== 'html') {
          el.remove();
        }
      }
    });
  });
}

// Ejecutar al cargar la página
removeAds();

// Observar cambios dinámicos en el DOM para eliminar anuncios que aparezcan después
const observer = new MutationObserver(mutations => {
  if (mutations.some(m => m.addedNodes.length > 0)) {
    removeAds();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
