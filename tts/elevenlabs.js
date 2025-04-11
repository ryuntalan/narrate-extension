/**
 * ElevenLabs TTS API Integration
 */

class ElevenLabsTTS {
  constructor(apiKey = null) {
    this.apiKey = apiKey || 'sk_9a45b5bab36262d5a53eec0e80475bdbff4b2f5a9a3a18ea';
    this.baseUrl = 'https://api.elevenlabs.io/v1';
    this.voiceId = 'EXAVITQu4vr4xnSDxMaL'; // Default voice ID (Rachel)
    this.modelId = 'eleven_monolingual_v1';
  }
  
  /**
   * Set API key
   * @param {string} apiKey - ElevenLabs API key
   */
  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }
  
  /**
   * Set voice ID
   * @param {string} voiceId - ElevenLabs voice ID
   */
  setVoice(voiceId) {
    this.voiceId = voiceId;
  }
  
  /**
   * Get available voices
   * @returns {Promise<Array>} - List of available voices
   */
  async getVoices() {
    try {
      // TODO: Implement actual API call when apiKey is available
      if (!this.apiKey) {
        console.warn('No API key provided for ElevenLabs');
        // Return mock voices
        return [
          { voice_id: 'EXAVITQu4vr4xnSDxMaL', name: 'Rachel' },
          { voice_id: '21m00Tcm4TlvDq8ikWAM', name: 'Adam' },
          { voice_id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi' }
        ];
      }
      
      const response = await fetch(`${this.baseUrl}/voices`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'xi-api-key': this.apiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch voices: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.voices;
    } catch (error) {
      console.error('Error fetching voices:', error);
      throw error;
    }
  }
  
  /**
   * Generate speech from text
   * @param {string} text - Text to convert to speech
   * @returns {Promise<Blob>} - Audio data as blob
   */
  async generateSpeech(text) {
    try {
      if (!this.apiKey) {
        console.warn('No API key provided for ElevenLabs, using browser TTS fallback');
        // Return null to signal the caller to use fallback TTS
        return null;
      }
      
      const payload = {
        text: text,
        model_id: this.modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      };
      
      const response = await fetch(`${this.baseUrl}/text-to-speech/${this.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to generate speech: ${response.statusText}`);
      }
      
      return await response.blob();
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }
}

// Export the class
if (typeof module !== 'undefined') {
  module.exports = ElevenLabsTTS;
}