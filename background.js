/**
 * Narrate Background Script
 * 
 * Handles initializing the extension and managing communications
 */

// Listen for action button click
chrome.action.onClicked.addListener((tab) => {
  // Inject the content script if needed
  if (tab.url.startsWith('http') || tab.url.startsWith('https')) {
    // Send a message to the content script to initialize
    chrome.tabs.sendMessage(tab.id, { action: 'initialize' }, (response) => {
      if (chrome.runtime.lastError) {
        // Content script isn't loaded, inject it
        console.log('Content script not loaded, injecting...');
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content-script.js']
        });
      } else {
        console.log('Content script already loaded, sending init event');
        // Content script is already loaded, send custom event
        chrome.tabs.sendMessage(tab.id, { action: 'toggleNarration' });
      }
    });
  } else {
    console.error('Cannot run Narrate on this page. Only HTTP/HTTPS URLs are supported.');
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'contentScriptLoaded') {
    console.log('Content script loaded, ready to initialize');
    sendResponse({ status: 'acknowledged' });
  }
});