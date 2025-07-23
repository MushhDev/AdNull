const adSelectors = [
  '.ad', '#ads', '.adsbygoogle', '[class*="sponsor"]', '[id^="ad_"]',
  '[class*="ad-"]', '[id*="google_ads"]', '[class^="ads-"]', '.banner-ad',
  '#sponsored', '.sponsored', 'iframe[src*="ads"]', 'div[id^="div-gpt-ad"]',
  '[data-ad]', 'ins.adsbygoogle', '.commercial', '.ad-container',
  '.adverts', '.advertisement', '[class*="adslot"]', '[class*="adbox"]',
  'img[src*="ads"]', 'a[href*="ads"]'
];

function removeAds() {
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.isConnected && el.remove());
  });
}

// Ejecuta al cargar y en mutaciones DOM para anuncios dinámicos
removeAds();

new MutationObserver(mutations => {
  if (mutations.some(m => m.addedNodes.length)) removeAds();
}).observe(document.body, { childList: true, subtree: true });
