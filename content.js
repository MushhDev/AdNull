const adSelectors = [
  '.ad-banner', '.ad-container', '.adsbygoogle', '.ad-placeholder',
  '[class*="ad-"]:not(iframe):not(video)',
  '[id^="ad_"]:not(iframe):not(video)',
  '.sponsored', '.sponsored-post', '.promoted-content',
  '.ad-overlay', '.popup-ad', '.video-ads',
  '.banner-ad', '.commercial', '.advertisement',
  '[aria-label="Advertisement"]', '[aria-label="Ads"]'
];

function removeAds() {
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (el.isConnected) {
        // Evitar eliminar iframes o videos para no romper reproductores legítimos
        const tag = el.tagName.toLowerCase();
        if (tag !== 'iframe' && tag !== 'video') {
          el.remove();
        }
      }
    });
  });
}

removeAds();

new MutationObserver(mutations => {
  if (mutations.some(m => m.addedNodes.length > 0)) removeAds();
}).observe(document.body, { childList: true, subtree: true });
