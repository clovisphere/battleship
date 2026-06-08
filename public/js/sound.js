let audio;

const makeNode = (oscType) => {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.type = oscType;
  return { osc, gain };
};

const makeNoise = (duration) => {
  const size = Math.ceil(audio.sampleRate * duration);
  const buffer = audio.createBuffer(1, size, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
  const source = audio.createBufferSource();
  source.buffer = buffer;
  return source;
};

export const playSound = (type) => {
  audio ??= new AudioContext();
  if (audio.state === "suspended") audio.resume();
  const t = audio.currentTime;

  if (type === "hit") {
    // Sawtooth punch
    const { osc, gain } = makeNode("sawtooth");
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.25);
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.start(); osc.stop(t + 0.25);
    // Low boom underneath
    const { osc: bass, gain: bassGain } = makeNode("sine");
    bass.frequency.setValueAtTime(80, t);
    bass.frequency.exponentialRampToValueAtTime(25, t + 0.2);
    bassGain.gain.setValueAtTime(0.6, t);
    bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    bass.start(); bass.stop(t + 0.2);
    return;
  }

  if (type === "miss") {
    // White noise through a descending bandpass — water splash
    const noise = makeNoise(0.3);
    const filter = audio.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(900, t);
    filter.frequency.exponentialRampToValueAtTime(200, t + 0.25);
    filter.Q.value = 1.5;
    const gain = audio.createGain();
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audio.destination);
    noise.start(t); noise.stop(t + 0.3);
    return;
  }

  if (type === "win") {
    // Ascending major arpeggio
    [261, 329, 392, 523].forEach((freq, i) => {
      const { osc, gain } = makeNode("sine");
      const at = t + i * 0.12;
      osc.frequency.setValueAtTime(freq, at);
      gain.gain.setValueAtTime(0.3, at);
      gain.gain.exponentialRampToValueAtTime(0.001, at + 0.4);
      osc.start(at); osc.stop(at + 0.4);
    });
    return;
  }

  if (type === "lose") {
    // Descending minor run — somber
    [392, 349, 294, 220].forEach((freq, i) => {
      const { osc, gain } = makeNode("sine");
      const at = t + i * 0.15;
      osc.frequency.setValueAtTime(freq, at);
      gain.gain.setValueAtTime(0.25, at);
      gain.gain.exponentialRampToValueAtTime(0.001, at + 0.3);
      osc.start(at); osc.stop(at + 0.3);
    });
    return;
  }

  if (type === "sonar") {
    const { osc, gain } = makeNode("sine");
    osc.frequency.setValueAtTime(1100, t);
    osc.frequency.exponentialRampToValueAtTime(550, t + 0.6);
    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    osc.start(); osc.stop(t + 0.6);
    return;
  }

  if (type === "dupe") {
    // Double buzz — reject
    [320, 240].forEach((freq, i) => {
      const { osc, gain } = makeNode("square");
      const at = t + i * 0.07;
      osc.frequency.setValueAtTime(freq, at);
      gain.gain.setValueAtTime(0.1, at);
      gain.gain.exponentialRampToValueAtTime(0.001, at + 0.06);
      osc.start(at); osc.stop(at + 0.06);
    });
    return;
  }

  if (type === "tick") {
    const { osc, gain } = makeNode("square");
    osc.frequency.setValueAtTime(1200, t);
    gain.gain.setValueAtTime(0.07, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc.start(); osc.stop(t + 0.04);
  }
};
