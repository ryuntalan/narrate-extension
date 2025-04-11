/**
 * Narrate Overlay Controls
 * 
 * Manages the UI for play/pause/stop controls and status display
 */

// State
const state = {
  isPlaying: false,
  status: 'Ready',
  // Currently using only Rachel's voice for simplicity
  voices: [
    { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Rachel (Female, Clear)' }
  ],
  selectedVoice: 'EXAVITQu4vr4xnSDxMaL' // Default to Rachel
};

/* ARCHIVED VOICE OPTIONS FOR FUTURE USE
const allVoices = [
  // Female voices
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Rachel (Female, Clear)' },
  { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Domi (Female, Soft)' },
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Mable (Female, Warm)' },
  { id: 'yoZ06aMxZJJ28mfd3POQ', name: 'Sam (Female, Raspy)' },
  { id: 'jBpfuIE2acCO8z3wKNLl', name: 'Bella (Female, Gentle)' },
  
  // Male voices
  { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh (Male, Neutral)' },
  { id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold (Male, Deep)' },
  { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni (Male, Smooth)' }
];
*/

// Elements
console.log('Overlay: DOM loaded, getting elements');
const playPauseButton = document.getElementById('play-pause');
console.log('Overlay: playPauseButton =', playPauseButton);
const playIcon = document.getElementById('play-icon');
console.log('Overlay: playIcon =', playIcon);
const statusElement = document.getElementById('status');
console.log('Overlay: statusElement =', statusElement);
const closeButton = document.getElementById('close');
console.log('Overlay: closeButton =', closeButton);

// Update UI based on state
const updateUI = () => {
  console.log('Overlay: updateUI called, isPlaying =', state.isPlaying);
  
  if (state.isPlaying) {
    if (playIcon) playIcon.textContent = '⏸';
    
    // Change button color to indicate playing state
    if (playPauseButton) {
      playPauseButton.style.backgroundImage = 'linear-gradient(135deg, #ffb093 0%, #ff8a86 100%)';
    }
  } else {
    if (playIcon) playIcon.textContent = '▶';
    
    // Restore default button color
    if (playPauseButton) {
      playPauseButton.style.backgroundImage = 'linear-gradient(135deg, #ff9e80 0%, #ff7571 100%)';
    }
  }
  
  if (statusElement) {
    statusElement.textContent = state.status;
  }
  console.log('Overlay UI updated, status:', state.status);
};

// Toggle play/pause
const togglePlayPause = () => {
  console.log('Overlay: togglePlayPause called');
  state.isPlaying = !state.isPlaying;
  updateUI();
  
  console.log('Overlay: Toggle play/pause, isPlaying =', state.isPlaying);
  
  try {
    // Send message to content script
    window.parent.postMessage({
      type: state.isPlaying ? 'play' : 'pause',
      voiceId: state.selectedVoice
    }, '*');
    console.log('Overlay: Message sent to parent:', state.isPlaying ? 'play' : 'pause');
  } catch (error) {
    console.error('Overlay: Error sending message to parent:', error);
  }
};

// Close overlay
const closeOverlay = () => {
  console.log('Overlay: Close button clicked');
  
  // First stop any playback
  stopPlayback();
  
  try {
    // Send message to content script to remove overlay
    window.parent.postMessage({
      type: 'close'
    }, '*');
    console.log('Overlay: Close message sent to parent');
  } catch (error) {
    console.error('Overlay: Error sending close message to parent:', error);
  }
};

// Stop playback (used by closeOverlay)
const stopPlayback = () => {
  state.isPlaying = false;
  updateUI();
  
  console.log('Overlay: Stop playback');
  
  try {
    // Send message to content script
    window.parent.postMessage({
      type: 'stop'
    }, '*');
    console.log('Overlay: Stop message sent to parent');
  } catch (error) {
    console.error('Overlay: Error sending stop message to parent:', error);
  }
};

// Event listeners
console.log('Overlay: Setting up event listeners');
if (playPauseButton) {
  playPauseButton.addEventListener('click', (e) => {
    console.log('Overlay: Play button clicked');
    e.preventDefault();
    togglePlayPause();
  });
}

if (closeButton) {
  closeButton.addEventListener('click', (e) => {
    console.log('Overlay: Close button clicked');
    e.preventDefault();
    closeOverlay();
  });
}

// Listen for messages from content script
window.addEventListener('message', (event) => {
  // Only accept messages from content script (parent)
  if (event.source !== window.parent) return;
  
  const { type, message } = event.data;
  console.log('Overlay: Received message', type, message);
  
  switch (type) {
    case 'status':
      state.status = message;
      
      // Update play/pause state based on status message
      if (message === 'Playing') {
        state.isPlaying = true;
      } else if (message === 'Paused' || message === 'Stopped' || message === 'Completed') {
        state.isPlaying = false;
      }
      
      updateUI();
      break;
  }
});

// Initialize UI
console.log('Overlay: Initializing UI');
window.addEventListener('DOMContentLoaded', () => {
  console.log('Overlay: DOMContentLoaded event');
  updateUI();
});

// If DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('Overlay: Page already loaded, state =', document.readyState);
  updateUI();
}

// Debug: expose state to console
window.overlayState = state;