chrome.runtime.onInstalled.addListener(() => {
  const rules = [
    // Google Ads
    {
      id: 1,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: "doubleclick.net", resourceTypes: ["script", "xmlhttprequest", "sub_frame"] }
    },
    {
      id: 2,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: "googlesyndication.com", resourceTypes: ["script", "image", "sub_frame"] }
    },
    {
      id: 3,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: "adservice.google.com", resourceTypes: ["script", "xmlhttprequest"] }
    },
    {
      id: 4,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: "pagead2.googlesyndication.com", resourceTypes: ["script", "image"] }
    },

    // Yahoo Ads
    {
      id: 5,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: "ads.yahoo.com", resourceTypes: ["script", "image"] }
    },

    // Adbrite
    {
      id: 6,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: "adbrite.com", resourceTypes: ["script", "image"] }
    },

    // YouTube Ads & video ads
    {
      id: 7,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: "youtube.com/pagead/", resourceTypes: ["script", "xmlhttprequest"] }
    },
    {
      id: 8,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: "googlevideo.com/ad", resourceTypes: ["media"] }
    },

    // Twitch Ads & tracking
    {
      id: 9,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: "twitchads.net", resourceTypes: ["script", "xmlhttprequest"] }
    },
    {
      id: 10,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: "ttvnw.net", resourceTypes: ["media", "script"] }
    },

    // Crunchyroll Ads (pueden variar mucho)
    {
      id: 11,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: "crunchyroll.com/ads", resourceTypes: ["script", "image"] }
    },

    // Facebook Ads
    {
      id: 12,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: "facebook.com/ads/", resourceTypes: ["script", "image"] }
    },

    // Twitter Ads
    {
      id: 13,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: "ads-twitter.com", resourceTypes: ["script", "image"] }
    },

    // Amazon Ads
    {
      id: 14,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: "aax.amazon-adsystem.com", resourceTypes: ["script", "image"] }
    }
  ];

  chrome.declarativeNetRequest.getDynamicRules(existingRules => {
    const existingRuleIds = new Set(existingRules.map(r => r.id));
    const toAdd = rules.filter(r => !existingRuleIds.has(r.id));
    const toRemove = existingRules.filter(r => !rules.some(rule => rule.id === r.id)).map(r => r.id);

    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: toAdd,
      removeRuleIds: toRemove
    });
  });
});
