const toggleBtn = document.getElementById('toggle');

chrome.storage.local.get('adblockEnabled', data => {
  const enabled = data.adblockEnabled ?? true;
  toggleBtn.textContent = enabled ? 'Desactivar AdBlock' : 'Activar AdBlock';
});

toggleBtn.addEventListener('click', () => {
  chrome.storage.local.get('adblockEnabled', data => {
    const enabled = data.adblockEnabled ?? true;
    chrome.storage.local.set({ adblockEnabled: !enabled }, () => {
      toggleBtn.textContent = !enabled ? 'Desactivar AdBlock' : 'Activar AdBlock';
      chrome.runtime.sendMessage({ type: 'adblockToggle', value: !enabled });
    });
  });
});
