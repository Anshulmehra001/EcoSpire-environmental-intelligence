import * as Tone from 'tone';

/**
 * A sample-based audio engine rebuilt for stability and reliability.
 * This version uses individual players and a standard loading mechanism to prevent silent failures.
 * The togglePlayback function is now corrected to properly mute/unmute all audio.
 */
export class AudioEngine {
  constructor() {
    // --- Create Individual Players for each sound file ---
    this.forestPlayer = new Tone.Player({
      url: "/sounds/forest-ambience.mp3",
      loop: true,
    }).toDestination();

    this.riverPlayer = new Tone.Player({
      url: "/sounds/river.mp3",
      loop: true,
    }).toDestination();

    this.threatPlayer = new Tone.Player({
      url: "/sounds/industrial-hum.mp3",
      loop: true,
    }).toDestination();

    this.birdPlayer = new Tone.Player({
      url: "/sounds/bird-call.mp3",
      loop: false,
    }).toDestination();

    // --- Musical Logic: A loop to trigger the non-looping bird sound ---
    this.biodiversityLoop = new Tone.Loop(time => {
      if (this.birdPlayer.state !== "started") {
        this.birdPlayer.start(time);
      }
    }, "8s").start(0);
    this.biodiversityLoop.humanize = true;
    this.biodiversityLoop.probability = 0;
  }

  // --- Public Control Methods ---

  async initialize() {
    await Tone.start();
    await Tone.loaded();

    console.log("All audio samples have been loaded.");

    this.forestPlayer.start(0);
    this.riverPlayer.start(0);
    this.threatPlayer.start(0);

    // Set initial volumes to silent
    this.forestPlayer.volume.value = -Infinity;
    this.riverPlayer.volume.value = -Infinity;
    this.threatPlayer.volume.value = -Infinity;
    this.birdPlayer.volume.value = -Infinity;

    // Start the master clock and mute the output initially
    Tone.Transport.start();
    Tone.Destination.mute = true;

    console.log("Audio Engine Initialized and Muted.");
  }

  // --- THIS IS THE CORRECTED FUNCTION ---
  togglePlayback(isPlaying) {
    // We mute/unmute the master output. This is the most reliable way to play/pause.
    Tone.Destination.mute = !isPlaying;
  }

  updateForest(value) { // 0-100
    const volume = Tone.gainToDb(value / 100);
    this.forestPlayer.volume.rampTo(value > 1 ? volume : -Infinity, 0.5);
  }

  updateBiodiversity(value) { // 0-100
    this.biodiversityLoop.probability = value / 100;
    const volume = Tone.gainToDb(value / 100);
    this.birdPlayer.volume.rampTo(value > 1 ? volume - 8 : -Infinity, 0.5);
  }

  updateWater(value) { // 0-100
    const volume = Tone.gainToDb(value / 100);
    this.riverPlayer.volume.rampTo(value > 1 ? volume - 10 : -Infinity, 0.5);
  }

  updateCO2(value) { // 280-500
    const intensity = Math.max(0, (value - 350) / 150);
    this.threatPlayer.volume.rampTo(intensity > 0.01 ? Tone.gainToDb(intensity) - 18 : -Infinity, 0.5);
  }

  dispose() {
    if (Tone.Transport.state === 'started') {
      Tone.Transport.stop();
      Tone.Transport.cancel();
    }
    
    this.forestPlayer.dispose();
    this.riverPlayer.dispose();
    this.threatPlayer.dispose();
    this.birdPlayer.dispose();
    this.biodiversityLoop.dispose();
    
    console.log("Audio Engine Disposed");
  }
}