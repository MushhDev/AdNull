const adSelectors = [
  '.ad:not(video):not(iframe)', '#ads:not(video):not(iframe)', '.adsbygoogle',
  '[class*="sponsor"]:not(video):not(iframe)', '[id^="ad_"]:not(video):not(iframe)',
  '[class*="ad-"]:not(video):not(iframe)', '[id*="google_ads"]:not(video):not(iframe)',
  '[class^="ads-"]:not(video):not(iframe)', '.banner-ad:not(video):not(iframe)',
  '#sponsored:not(video):not(iframe)', '.sponsored:not(video):not(iframe)', 
  'iframe[src*="ads"]:not([src*="youtube.com/embed"])', 'div[id^="div-gpt-ad"]:not(video):not(iframe)',
  '[data-ad]:not(video):not(iframe)', 'ins.adsbygoogle:not(video):not(iframe)', 
  '.commercial:not(video):not(iframe)', '.ad-container:not(video):not(iframe)',
  '.adverts:not(video):not(iframe)', '.advertisement:not(video):not(iframe)', 
  '[class*="adslot"]:not(video):not(iframe)', '[class*="adbox"]:not(video):not(iframe)',
  'img[src*="ads"]:not(video):not(iframe)', 'a[href*="ads"]:not(video):not(iframe)',
  '.ad-overlay:not(video):not(iframe)', '.adpopup:not(video):not(iframe)', 
  '.popup-ad:not(video):not(iframe)', '.video-ads:not(video):not(iframe)', 
  '.ad-wrapper:not(video):not(iframe)', '.adblock-detected:not(video):not(iframe)', 
  '.ad-placeholder:not(video):not(iframe)', '.ads-overlay:not(video):not(iframe)',
  '.ytp-ad-module:not(video):not(iframe)', '.ytp-ad-player-overlay:not(video):not(iframe)', 
  '.ytp-ad-text:not(video):not(iframe)', '.player-ads:not(video):not(iframe)', 
  '.vjs-ad-block:not(video):not(iframe)', '.vjs-ad-overlay:not(video):not(iframe)',
  '.twitch-ad:not(video):not(iframe)', '.ad-slot:not(video):not(iframe)', 
  '.ad-slot-container:not(video):not(iframe)', '.cr-ad-container:not(video):not(iframe)', 
  '.twitch-player-ad-overlay:not(video):not(iframe)', '.twitch-ad-container:not(video):not(iframe)',
  '[data-google-query-id]:not(video):not(iframe)', '[data-ad-client]:not(video):not(iframe)', 
  '[data-ad-slot]:not(video):not(iframe)', '[aria-label="Advertisement"]:not(video):not(iframe)', 
  '[aria-label="Ads"]:not(video):not(iframe)', 'img[src*="ads"]:not(video):not(iframe)', 
  'iframe[src*="ads"]:not([src*="youtube.com/embed"]):not([src*="player.twitch.tv"])', 
  'iframe[src*="doubleclick"]:not([src*="youtube.com/embed"]):not([src*="player.twitch.tv"])',
  '.sponsored-post:not(video):not(iframe)', '.promoted-content:not(video):not(iframe)', 
  '.ad-post:not(video):not(iframe)', '.ad-social:not(video):not(iframe)'
];

function removeAds() {
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (el.isConnected && !['body', 'html', 'video', 'iframe'].includes(el.tagName.toLowerCase())) {
        el.remove();
      }
    });
  });
}

removeAds();

new MutationObserver(mutations => {
  if (mutations.some(m => m.addedNodes.length > 0)) removeAds();
}).observe(document.body, { childList: true, subtree: true });
