const baseRules = [
  { id: 1, priority: 1, action: { type: "block" }, condition: { urlFilter: "doubleclick.net", resourceTypes: ["script", "xmlhttprequest", "sub_frame"] } },
  { id: 2, priority: 1, action: { type: "block" }, condition: { urlFilter: "googlesyndication.com", resourceTypes: ["script", "image", "sub_frame"] } },
  { id: 3, priority: 1, action: { type: "block" }, condition: { urlFilter: "adservice.google.com", resourceTypes: ["script", "xmlhttprequest"] } },
  { id: 4, priority: 1, action: { type: "block" }, condition: { urlFilter: "pagead2.googlesyndication.com", resourceTypes: ["script", "image"] } },
  { id: 5, priority: 1, action: { type: "block" }, condition: { urlFilter: "ads.yahoo.com", resourceTypes: ["script", "image"] } },
  { id: 6, priority: 1, action: { type: "block" }, condition: { urlFilter: "adbrite.com", resourceTypes: ["script", "image"] } },
  { id: 7, priority: 1, action: { type: "block" }, condition: { urlFilter: "youtube.com/pagead/", resourceTypes: ["script", "xmlhttprequest"] } },
  { id: 8, priority: 1, action: { type: "block" }, condition: { urlFilter: "googlevideo.com/ad", resourceTypes: ["media"] } },
  { id: 9, priority: 1, action: { type: "block" }, condition: { urlFilter: "twitchads.net", resourceTypes: ["script", "xmlhttprequest"] } },
  { id: 10, priority: 1, action: { type: "block" }, condition: { urlFilter: "ttvnw.net", resourceTypes: ["media", "script"] } },
  { id: 11, priority: 1, action: { type: "block" }, condition: { urlFilter: "crunchyroll.com/ads", resourceTypes: ["script", "image"] } },
  { id: 12, priority: 1, action: { type: "block" }, condition: { urlFilter: "facebook.com/ads/", resourceTypes: ["script", "image"] } },
  { id: 13, priority: 1, action: { type: "block" }, condition: { urlFilter: "ads-twitter.com", resourceTypes: ["script", "image"] } },
  { id: 14, priority: 1, action: { type: "block" }, condition: { urlFilter: "aax.amazon-adsystem.com", resourceTypes: ["script", "image"] } }
];

let blockedCount = 0;

async function fetchExternalRules() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt');
    if (!res.ok) return [];
    const text = await res.text();
    const lines = text.split('\n').filter(line => line.startsWith('||') && !line.includes('*') && !line.includes('^$') && !line.startsWith('!'));
    const domains = [...new Set(lines.map(l => l.replace(/^||/, '').replace(/\^.*$/, '').trim()).filter(Boolean))].slice(0, 200);
    return domains.map((domain, i) => ({
      id: baseRules.length + i + 1,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: domain,
        resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame", "media"]
      }
    }));
  } catch {
    return [];
  }
}

async function updateRules() {
  const { adblockEnabled } = await chrome.storage.local.get('adblockEnabled');
  if (adblockEnabled === false) {
    const rules = await chrome.declarativeNetRequest.getDynamicRules();
    const ids = rules.map(r => r.id);
    await chrome.declarativeNetRequest.updateDynamicRules({ addRules: [], removeRuleIds: ids });
    return;
  }
  const externalRules = await fetchExternalRules();
  const allRules = [...baseRules, ...externalRules];
  try {
    const existing = await chrome.declarativeNetRequest.getDynamicRules();
    const existingIds = new Set(existing.map(r => r.id));
    const toAdd = allRules.filter(r => !existingIds.has(r.id));
    const toRemove = existing.filter(r => !allRules.some(rule => rule.id === r.id)).map(r => r.id);
    await chrome.declarativeNetRequest.updateDynamicRules({ addRules: toAdd, removeRuleIds: toRemove });
  } catch {}
}

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(() => {
  blockedCount++;
});

chrome.runtime.onInstalled.addListener(() => {
  updateRules();
});

setInterval(updateRules, 86400000);

chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg === 'getBlockedCount') sendResponse({ blocked: blockedCount });
  if (msg.type === 'adblockToggle') updateRules();
});
