// This function runs inside the web page context
function xrayPage() {
    console.log("AdOps X-Ray: Scanning started...");
    
    // Common ad iframe selectors and patterns
    let frames = document.getElementsByTagName("iframe");
    let adCount = 0;
    let googleCount = 0;
    let prebidCount = 0;

    for (let i = 0; i < frames.length; i++) {
        let frame = frames[i];
        let src = frame.src;
        let id = frame.id;
        
        // Basic Logic: If it looks like an ad, highlight it
        // We check for common ad server domains or standard sizes
        let isAd = false;
        
        if (src.includes("doubleclick.net") || src.includes("googlesyndication")) {
            isAd = true;
            googleCount++;
        } else if (src.includes("adnxs") || src.includes("rubicon") || src.includes("criteo")) {
            isAd = true;
            prebidCount++;
        } else if (frame.width == 300 && frame.height == 250) { // MPU
            isAd = true;
        } else if (frame.width == 728 && frame.height == 90) { // Leaderboard
            isAd = true;
        }

        if (isAd) {
            adCount++;
            
            // 1. ADD RED BORDER
            frame.style.border = "5px solid #e74c3c";
            frame.style.boxSizing = "border-box";
            
            // 2. CREATE A LABEL
            // It's hard to overlay on iframe, so we try to insert a div before it
            try {
                let label = document.createElement("div");
                label.innerText = `AD: ${frame.width}x${frame.height}`;
                label.style.backgroundColor = "#e74c3c";
                label.style.color = "white";
                label.style.padding = "2px 5px";
                label.style.fontSize = "12px";
                label.style.position = "absolute";
                label.style.zIndex = "99999";
                
                // Try to position it (simple approximation)
                frame.parentNode.insertBefore(label, frame);
            } catch(e) {
                console.log("Could not label frame", e);
            }
        }
    }

    return {
        total: adCount,
        google: googleCount,
        prebid: prebidCount
    };
}