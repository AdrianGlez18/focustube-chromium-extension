const toggle = document.getElementById("focusToggle");

// Load the stored value
chrome.storage.sync.get(["focusEnabled"], (result) => {
  toggle.checked = result.focusEnabled ?? true;
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ focusEnabled: enabled });
  
  // Refresh the current tab to apply changes
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.reload(tabs[0].id);
  });
});
