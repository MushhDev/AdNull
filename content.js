const adSelectors = [
  '.ad-banner', '.ad-container', '.adsbygoogle', '.ad-placeholder',
  '.sponsored', '.sponsored-post', '.promoted-content',
  '.ad-overlay', '.popup-ad', '.video-ads',
  '.banner-ad', '.commercial', '.advertisement',
  '[aria-label="Advertisement"]', '[aria-label="Ads"]'
];

function isSafeToRemove(el) {
  if (el.querySelector('iframe, video')) return false;
  const tag = el.tagName.toLowerCase();
  if (tag === 'iframe' || tag === 'video') return false;
  return true;
}

function removeAds() {
  if (location.hostname.includes('youtube.com') || location.hostname.includes('twitch.tv')) return;
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (el.isConnected && isSafeToRemove(el)) {
        el.remove();
      }
    });
  });
}

removeAds();

new MutationObserver(mutations => {
  for (const m of mutations) {
    if (m.addedNodes.length > 0) {
      removeAds();
      break;
    }
  }
}).observe(document.body, { childList: true, subtree: true });
