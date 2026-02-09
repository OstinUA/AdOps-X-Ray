document.getElementById("scanBtn").addEventListener("click", async () => {
  // Get the active tab
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Inject the script logic into the page
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: runScanner
  }, (results) => {
    // Handle the result returned from the page
    if (results && results[0] && results[0].result) {
        let data = results[0].result;
        
        // Update UI
        document.getElementById("results").style.display = "block";
        document.getElementById("adCount").innerText = data.total;
        document.getElementById("googleCount").innerText = data.google;
        document.getElementById("prebidCount").innerText = data.prebid;
    }
  });
});

// Wrapper function to call the logic inside content
function runScanner() {
    // We copy the function body here or reference content.js
    // For simplicity in this architecture, we will reuse the logic:
    
    let frames = document.getElementsByTagName("iframe");
    let adCount = 0;
    let googleCount = 0;
    let prebidCount = 0;

    for (let i = 0; i < frames.length; i++) {
        let frame = frames[i];
        let src = frame.src || "";
        
        // Check heuristics
        let isAd = src.includes("doubleclick.net") || 
                   src.includes("googlesyndication") || 
                   src.includes("adnxs") ||
                   (frame.width == 300 && frame.height == 250) ||
                   (frame.width == 728 && frame.height == 90);

        if (isAd) {
            adCount++;
            if (src.includes("google")) googleCount++;
            if (src.includes("adnxs") || src.includes("rubicon")) prebidCount++;

            // VISUAL HIGHLIGHT
            frame.style.border = "4px solid red";
        }
    }

    return { total: adCount, google: googleCount, prebid: prebidCount };
}