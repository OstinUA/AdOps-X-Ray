# AdOps X-Ray: Chrome Extension

A developer tool for AdOps professionals to visualize, audit, and debug ad placements directly in the browser.

Unlike backend parsers, **AdOps X-Ray** inspects the live DOM (Document Object Model) to identify rendered IFrames, verify dimensions, and detect ad serving sources (Google Ad Manager, Prebid, etc.) in real-time.



## Features

* **DOM Injection:** Scans the active page for IFrame elements matching ad heuristics.
* **Visual Debugging:** Highlights ad units with a high-contrast red border for layout verification.
* **Inventory Analysis:** Counts total ad units and segments them by source (Google vs. Header Bidding).
* **Manifest V3:** Built using the latest Chrome Extension security standards.

## Tech Stack

* JavaScript (ES6)
* Chrome Extension API (Scripting, ActiveTab)
* HTML5 / CSS3

## Installation (Developer Mode)

Since this is a developer tool, you install it as an "Unpacked Extension":

1.  Clone this repository.
2.  Open Chrome and go to `chrome://extensions`.
3.  Enable **Developer mode** (toggle in the top right).
4.  Click **Load unpacked**.
5.  Select the folder containing `manifest.json`.
6.  Go to any site with ads (e.g., cnn.com) and click the extension icon.
