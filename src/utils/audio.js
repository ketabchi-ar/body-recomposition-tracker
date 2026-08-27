// Web Audio API beep generator for Rest Timer
class SoundEffects {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBeep(freq = 600, type = 'sine', duration = 0.15) {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playback error:", e);
    }
  }

  playCompletionChime() {
    try {
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        setTimeout(() => {
          this.playBeep(freq, 'triangle', 0.25);
        }, index * 120);
      });
    } catch (e) {
      console.warn("Audio chime error:", e);
    }
  }

  playTimerAlert() {
    try {
      this.init();
      if (!this.ctx) return;

      const tones = [880, 880, 1174.66]; // A5, A5, D6
      tones.forEach((freq, index) => {
        setTimeout(() => {
          this.playBeep(freq, 'sine', 0.18);
        }, index * 180);
      });
    } catch (e) {
      console.warn("Timer alert error:", e);
    }
  }
}

export const sounds = new SoundEffects();
