const adSelectors = [
  '.ad', '#ads', '.adsbygoogle',
  '[class*="sponsor"]', '[id^="ad_"]',
  '[class*="ad-"]', '[id*="google_ads"]',
  '[class^="ads-"]', '.banner-ad', '#sponsored',
  '.sponsored', 'iframe[src*="ads"]'
];

function removeAds() {
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.remove());
  });
}

// Ejecutar al cargar
removeAds();

// También reintentar tras mutaciones
const observer = new MutationObserver(removeAds);
observer.observe(document.body, { childList: true, subtree: true });
