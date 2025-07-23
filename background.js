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

async function updateRules() {
  let externalRules = [];
  try {
    const res = await fetch('https://easylist.to/easylist/easylist.txt');
    if (!res.ok) throw new Error();
    const text = await res.text();
    externalRules = text.split('\n')
      .filter(line => line.startsWith('||') && !line.startsWith('!'))
      .slice(0, 50)
      .map((line, i) => ({
        id: baseRules.length + 1 + i,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: line.replace(/^||/, '').replace(/\^.*$/, ''),
          resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame", "media"]
        }
      }));
  } catch {}
  const allRules = [...baseRules, ...externalRules];
  chrome.declarativeNetRequest.getDynamicRules(existingRules => {
    const existingIds = new Set(existingRules.map(r => r.id));
    const toAdd = allRules.filter(r => !existingIds.has(r.id));
    const toRemove = existingRules.filter(r => !allRules.some(rule => rule.id === r.id)).map(r => r.id);
    chrome.declarativeNetRequest.updateDynamicRules({ addRules: toAdd, removeRuleIds: toRemove });
  });
}

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(() => { blockedCount++; });

chrome.runtime.onInstalled.addListener(() => { updateRules(); });

setInterval(updateRules, 24 * 60 * 60 * 1000);

chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg === 'getBlockedCount') sendResponse({ blocked: blockedCount });
});
