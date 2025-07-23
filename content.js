const adSelectors = [
  '.ad', '#ads', '.adsbygoogle', '[class*="sponsor"]', '[id^="ad_"]',
  '[class*="ad-"]', '[id*="google_ads"]', '[class^="ads-"]', '.banner-ad',
  '#sponsored', '.sponsored', 'iframe[src*="ads"]', 'div[id^="div-gpt-ad"]',
  '[data-ad]', 'ins.adsbygoogle', '.commercial', '.ad-container',
  '.adverts', '.advertisement', '[class*="adslot"]', '[class*="adbox"]',
  'img[src*="ads"]', 'a[href*="ads"]',
  '.ad-overlay', '.adpopup', '.popup-ad', '.video-ads', '.ad-wrapper',
  '.adblock-detected', '.ad-placeholder', '.ads-overlay',
  '.ytp-ad-module', '.ytp-ad-player-overlay', '.ytp-ad-text',
  '.player-ads', '.vjs-ad-block', '.vjs-ad-overlay',
  '.twitch-ad', '.ad-slot', '.ad-slot-container',
  '.cr-ad-container', '.twitch-player-ad-overlay', '.twitch-ad-container',
  '[data-google-query-id]', '[data-ad-client]', '[data-ad-slot]',
  '[aria-label="Advertisement"]', '[aria-label="Ads"]',
  'img[src*="ads"]', 'iframe[src*="ads"]', 'iframe[src*="doubleclick"]',
  '.sponsored-post', '.promoted-content', '.ad-post', '.ad-social'
];

function removeAds() {
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (el.isConnected && el.tagName.toLowerCase() !== 'body' && el.tagName.toLowerCase() !== 'html') {
        el.remove();
      }
    });
  });
}

removeAds();

new MutationObserver(mutations => {
  if (mutations.some(m => m.addedNodes.length > 0)) removeAds();
}).observe(document.body, { childList: true, subtree: true });
