// Web Audio API Sound Generator with safe error boundaries

class SoundEffects {
  constructor() {
    this.audioCtx = null;
  }

  init() {
    try {
      if (!this.audioCtx && typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
    } catch (e) {
      console.warn('Audio Context init error:', e);
    }
  }

  playBeep(freq = 600, type = 'sine', duration = 0.1) {
    try {
      this.init();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio playBeep error:', e);
    }
  }

  playTimerAlert() {
    try {
      this.playBeep(880, 'triangle', 0.2);
      setTimeout(() => this.playBeep(880, 'triangle', 0.2), 250);
      setTimeout(() => this.playBeep(1174, 'sine', 0.4), 500);
    } catch (e) {
      console.warn('Audio playTimerAlert error:', e);
    }
  }

  playCompletionChime() {
    try {
      this.playBeep(523.25, 'sine', 0.15); // C5
      setTimeout(() => this.playBeep(659.25, 'sine', 0.15), 100); // E5
      setTimeout(() => this.playBeep(783.99, 'sine', 0.15), 200); // G5
      setTimeout(() => this.playBeep(1046.50, 'sine', 0.35), 300); // C6
    } catch (e) {
      console.warn('Audio playCompletionChime error:', e);
    }
  }
}

export const sounds = new SoundEffects();
