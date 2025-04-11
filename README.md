# Narrate Chrome Extension

Narrate is a Chrome Extension that reads aloud the entire readable content of a webpage (such as a Medium article) using ElevenLabs' AI-generated voice. As the voice progresses, Narrate highlights each sentence on the page in real-time, creating a synchronized read-along experience.

## Features

- Extracts readable article content from any webpage using a simplified version of Mozilla Readability
- Splits content into sentences with intelligent handling of edge cases
- Uses ElevenLabs' Text-to-Speech API to generate natural-sounding audio (with browser TTS fallback)
- Highlights each sentence in the DOM as it's being spoken
- Provides a floating control panel with Play/Pause/Stop buttons

## Project Structure

- `manifest.json`: Chrome extension manifest (V3)
- `content-script.js`: Extracts content and injects highlights into the DOM
- `overlay.html` + `overlay.js`: Floating UI controls
- `tts/elevenlabs.js`: Handles API calls to ElevenLabs TTS
- `audio/audio-queue.js`: Queues and plays audio clips
- `utils/readability.js`: Simplified version of Mozilla Readability
- `utils/tokenizer.js`: Splits text into sentences
- `styles/highlight.css`: CSS for active sentence highlighting

## Installation

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `narrate` directory
5. The extension will appear in your Chrome toolbar

## Usage

1. Navigate to any article or text-heavy webpage
2. Click the Narrate icon in your Chrome toolbar
3. A floating control panel will appear in the bottom right of the page
4. Click the Play button to start reading the content
5. Each sentence will be highlighted as it's read aloud
6. Use the Pause/Stop buttons to control playback

## Configuration

To use ElevenLabs TTS instead of the browser's built-in TTS:

1. Sign up for an [ElevenLabs](https://elevenlabs.io/) account
2. Get your API key from the ElevenLabs dashboard
3. Add your API key in the extension options (future feature)

## Development

This is an MVP version focusing on core functionality. Future improvements could include:

- User authentication
- Local storage for preferences
- Multiple voice options
- Enhanced text extraction
- Speed controls
- More sophisticated sentence tokenization

## License

MIT