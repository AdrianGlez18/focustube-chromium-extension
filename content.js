function applyFocusMode() {
  chrome.storage.sync.get(["focusEnabled"], (result) => {
    const enabled = result.focusEnabled ?? true;
  
    if (!enabled) {
      document.body.classList.remove("focus-mode");
      return;
    }
  
    document.body.classList.add("focus-mode");
  
    function enforceTheaterMode() {
      const flexy = document.querySelector("ytd-watch-flexy");
      const sizeButton = document.querySelector(".ytp-size-button");
    
      if (flexy && sizeButton && !flexy.hasAttribute("theater")) {
        setTimeout(() => {
          if (!flexy.hasAttribute("theater")) {
            sizeButton.click();
          }
        }, 500);
      }
    }

    if (window.location.pathname.startsWith("/watch")) {
      enforceTheaterMode();
    }
  
    const container = document.querySelector("body.focus-mode ytd-masthead #container");
    const masthead_container = document.querySelector("body.focus-mode #masthead-container");
    const start = document.querySelector("body.focus-mode #start");
    const center = document.querySelector("body.focus-mode #center");
    const logo_container = document.querySelector("body.focus-mode ytd-topbar-logo-renderer#logo");
    const logo = document.querySelector("body.focus-mode a#logo yt-icon");
  
    // Clean the homepage layout
    if (window.location.pathname === "/") {    
      if (container && !container.classList.contains("custom-container-config")) {
        container.classList.add("custom-container-config");
      }
      if (masthead_container && !masthead_container.classList.contains("custom-masthead-config")) {
        masthead_container.classList.add("custom-masthead-config");
      }
      if (start && !start.classList.contains("custom-start-config")) {
        start.classList.add("custom-start-config");
      }
      if (center && !center.classList.contains("custom-center-config")) {
        center.classList.add("custom-center-config");
      }
      if (logo_container && !logo_container.classList.contains("custom-logo-container-config")) {
        logo_container.classList.add("custom-logo-container-config");
      }
      if (logo && !logo.classList.contains("custom-logo-config")) {
        logo.classList.add("custom-logo-config");
      }
    } else {
      if (container && container.classList.contains("custom-container-config")) {
        container.classList.remove("custom-container-config");
      }
      if (masthead_container && masthead_container.classList.contains("custom-masthead-config")) {
        masthead_container.classList.remove("custom-masthead-config");
      }
      if (start && start.classList.contains("custom-start-config")) {
        start.classList.remove("custom-start-config");
      }
      if (center && center.classList.contains("custom-center-config")) {
        center.classList.remove("custom-center-config");
      }
      if (logo_container && logo_container.classList.contains("custom-logo-container-config")) {
        logo_container.classList.remove("custom-logo-container-config");
      }
      if (logo && logo.classList.contains("custom-logo-config")) {
        logo.classList.remove("custom-logo-config");
      }
    }
  
    // Remove dynamic overlays
    const observer = new MutationObserver(() => {
      document.querySelectorAll('.ytp-ce-element').forEach(el => el.remove());
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

// Initial run
applyFocusMode();

// Re-run on SPA navigation
window.addEventListener("yt-navigate-finish", () => {
  applyFocusMode();
});