import { useState, useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --i1: #c8deff;
  --i2: #b8f0e8;
  --i3: #e8d8ff;
  --i4: #fff0c0;
  --i5: #c0e8ff;
  --i6: #d0ffe8;
  --text:  #e8eaf4;
  --muted: #7880a8;
  --light: #080c18;
  --surface: rgba(255,255,255,0.04);
  --border: rgba(180,200,255,0.1);
}

html { scroll-behavior: smooth; }

body {
  font-family: 'Roboto Mono', monospace;
  background: var(--light);
  color: var(--text);
  overflow-x: hidden;
}

/* BACKGROUND */
.bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.18;
}
.blob-1 { width: 700px; height: 700px; background: radial-gradient(var(--i1), transparent 70%); top: -200px; left: -200px; animation: drift1 22s ease-in-out infinite; }
.blob-2 { width: 550px; height: 550px; background: radial-gradient(var(--i3), transparent 70%); top: 15%; right: -150px; animation: drift2 18s ease-in-out infinite; }
.blob-3 { width: 450px; height: 450px; background: radial-gradient(var(--i2), transparent 70%); bottom: 20%; left: 5%; animation: drift3 25s ease-in-out infinite; }
.blob-4 { width: 500px; height: 500px; background: radial-gradient(var(--i5), transparent 70%); bottom: -100px; right: 10%; animation: drift1 20s ease-in-out infinite reverse; }
.blob-5 { width: 350px; height: 350px; background: radial-gradient(var(--i4), transparent 70%); top: 55%; left: 38%; animation: drift2 28s ease-in-out infinite reverse; }

@keyframes drift1 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(40px,-50px)} 66%{transform:translate(-25px,35px)} }
@keyframes drift2 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(-35px,45px)} 66%{transform:translate(30px,-30px)} }
@keyframes drift3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(50px,-40px)} }

/* NAV */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 3.5rem;
  background: rgba(8,12,24,0.85);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--border);
}
.nav-logo {
  font-family: 'Roboto Mono', monospace;
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.06em;
  text-decoration: none;
  color: var(--text);
}
.nav-logo span {
  font-style: italic;
  background: linear-gradient(135deg, var(--i1), var(--i2), var(--i3));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.nav-links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
}
.nav-links a {
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--text); }

section { position: relative; z-index: 1; }

/* HERO */
.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7rem 2rem 3rem;
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
}
.hero-inner { max-width: 680px; width: 100%; }

.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1.1rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  backdrop-filter: blur(12px);
  margin: 0 auto 1.8rem;
}
.pill-dot {
  width: 7px; height: 7px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--i1), var(--i2));
  animation: blink 2.4s ease infinite;
}
@keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }

.hero-tag {
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 1.2rem;
}
.hero-name {
  font-family: 'Roboto Mono', monospace;
  font-size: clamp(4.5rem, 11vw, 9rem);
  font-weight: 300;
  line-height: 0.92;
  letter-spacing: -0.02em;
  margin-bottom: 1.8rem;
  background: linear-gradient(135deg, var(--i1) 0%, var(--i3) 40%, var(--i2) 70%, var(--i5) 100%);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: iris 8s ease infinite;
}
@keyframes iris { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

.hero-bio {
  font-family: 'Roboto Mono', monospace;
  font-size: 1.3rem;
  font-style: italic;
  font-weight: 300;
  line-height: 1.8;
  color: var(--muted);
  max-width: 520px;
  margin: 0 auto 2.4rem;
}
.hero-btns { display: flex; gap: 1.2rem; align-items: center; justify-content: center; }

.btn-main {
  padding: 0.9rem 2.4rem;
  background: linear-gradient(135deg, var(--i1), var(--i3));
  color: #080c18;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.25s, box-shadow 0.25s;
  box-shadow: 0 6px 24px rgba(168,200,240,0.38);
}
.btn-main:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(168,200,240,0.5); }

.btn-ghost {
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  border-bottom: 1px solid rgba(140,160,200,0.3);
  padding-bottom: 2px;
  transition: color 0.2s, border-color 0.2s;
}
.btn-ghost:hover { color: var(--text); border-color: var(--i1); }

/* ABOUT */
.about {
  padding: 4rem 2rem;
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  gap: 3.5rem;
  align-items: center;
}
.morph {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 60% 40% 55% 45% / 45% 55% 45% 55%;
  background: linear-gradient(135deg, var(--i1), var(--i3), var(--i2), var(--i5));
  background-size: 300% 300%;
  animation: morph 14s ease-in-out infinite, iris 8s ease infinite;
  box-shadow: 0 30px 80px rgba(168,200,240,0.2);
  position: relative;
  overflow: hidden;
}
.morph::before {
  content: '';
  position: absolute;
  inset: 18%;
  border-radius: 999px;
  background: rgba(255,255,255,0.12);
  animation: morph 9s ease-in-out infinite reverse;
}
@keyframes morph {
  0%,100% { border-radius: 60% 40% 55% 45% / 45% 55% 45% 55%; }
  25%      { border-radius: 45% 55% 40% 60% / 60% 40% 60% 40%; }
  50%      { border-radius: 35% 65% 60% 40% / 50% 60% 40% 60%; }
  75%      { border-radius: 65% 35% 45% 55% / 35% 65% 55% 45%; }
}

.about-label {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 1.2rem;
}
.about-heading {
  font-family: 'Roboto Mono', monospace;
  font-size: 3.2rem;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 1.8rem;
}
.about-heading em {
  font-style: italic;
  background: linear-gradient(135deg, var(--i1), var(--i3));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.about-text {
  font-family: 'Roboto Mono', monospace;
  font-size: 1.18rem;
  font-weight: 300;
  line-height: 1.9;
  color: var(--muted);
  margin-bottom: 1.2rem;
}

/* WORKS */
.works {
  padding: 3rem 2rem 4rem;
  max-width: 900px;
  margin: 0 auto;
}
.works-head { margin-bottom: 2rem; }
.works-label {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.75rem;
}
.works-title {
  font-family: 'Roboto Mono', monospace;
  font-size: 3rem;
  font-weight: 300;
  line-height: 1.1;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.4rem;
}

.card {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 28px;
  overflow: hidden;
  backdrop-filter: blur(16px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-7px);
  box-shadow: 0 24px 64px rgba(200,220,255,0.1);
}

.card-thumb {
  height: 210px;
  position: relative;
  overflow: hidden;
  border-radius: 24px 24px 0 0;
}
.card-thumb-inner {
  position: absolute;
  inset: 0;
  transition: transform 0.5s ease;
}
.card:hover .card-thumb-inner { transform: scale(1.04); }

.c1 .card-thumb-inner { background: linear-gradient(135deg, #1a2a4a 0%, #2a1a4a 100%); }
.c2 .card-thumb-inner { background: linear-gradient(135deg, #0a2a3a 0%, #1a3a2a 100%); }
.c3 .card-thumb-inner { background: linear-gradient(135deg, #2a1a4a 0%, #1a2a4a 100%); }
.c4 .card-thumb-inner { background: linear-gradient(135deg, #2a2a1a 0%, #1a2a3a 100%); }

.thumb-orb {
  position: absolute;
  border-radius: 999px;
  background: rgba(200,220,255,0.12);
}
.orb-a { width: 130px; height: 130px; bottom: -35px; right: -25px; }
.orb-b { width: 65px;  height: 65px;  top: 18px; left: 18px; }
.orb-c { width: 40px;  height: 40px;  top: 50%; right: 30%; }

.card-body { padding: 1.4rem 1.6rem 1.6rem; }
.card-cat {
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.45rem;
}
.card-title {
  font-family: 'Roboto Mono', monospace;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.25;
  margin-bottom: 0.55rem;
}
.card-desc {
  font-size: 0.8rem;
  color: var(--muted);
  line-height: 1.7;
}

/* MUSIC PLAYER */
.player-wrap {
  padding: 0 2rem 3rem;
  max-width: 900px;
  margin: 0 auto;
}
.player {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.player-header {
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
}
.player-track {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.player-art {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--i1), var(--i3), var(--i2));
  background-size: 200% 200%;
  animation: iris 6s ease infinite;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}
.player-info { flex: 1; min-width: 0; }
.player-title {
  font-family: 'Roboto Mono', monospace;
  font-size: 1.1rem;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.player-artist {
  font-size: 0.72rem;
  color: var(--muted);
  margin-top: 0.15rem;
}
.player-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.ctrl-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, transform 0.15s;
  padding: 0.2rem;
}
.ctrl-btn:hover { color: var(--text); transform: scale(1.1); }
.ctrl-btn.play {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--i1), var(--i3));
  color: var(--text);
  font-size: 1rem;
  box-shadow: 0 4px 16px rgba(168,200,240,0.35);
}
.ctrl-btn.play:hover { transform: scale(1.08); box-shadow: 0 8px 24px rgba(168,200,240,0.45); }

.player-progress {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.prog-time {
  font-size: 0.65rem;
  font-family: 'Roboto Mono', monospace;
  color: var(--muted);
  flex-shrink: 0;
  width: 32px;
}
.prog-track {
  flex: 1;
  height: 4px;
  background: rgba(140,160,200,0.18);
  border-radius: 999px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.prog-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--i1), var(--i3));
  transition: width 0.3s linear;
  pointer-events: none;
}
.player-upload {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.upload-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.2rem;
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}
.upload-btn input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  font-size: 0;
}
.upload-btn:hover { border-color: var(--i1); color: var(--text); background: rgba(168,200,240,0.1); }
.upload-hint {
  font-size: 0.65rem;
  color: var(--muted);
}

/* CONTACT */
.contact {
  padding: 3rem 2rem 5rem;
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
}
.contact-label {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 1rem;
}
.contact-divider {
  width: 55px;
  height: 2px;
  background: linear-gradient(90deg, var(--i1), var(--i3));
  border-radius: 999px;
  margin: 0 auto 1.8rem;
}
.contact-heading {
  font-family: 'Roboto Mono', monospace;
  font-size: clamp(2.4rem, 5.5vw, 4.5rem);
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 1.4rem;
}
.contact-heading em {
  font-style: italic;
  background: linear-gradient(135deg, var(--i1), var(--i3));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.contact-sub {
  font-family: 'Roboto Mono', monospace;
  font-size: 1.18rem;
  font-style: italic;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.75;
  margin-bottom: 3.5rem;
}

.form { display: flex; flex-direction: column; gap: 1.15rem; text-align: left; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.15rem; }
.form-field { display: flex; flex-direction: column; gap: 0.38rem; }
.form-field label {
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}
.form-field input, .form-field textarea {
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 0.88rem 1.15rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.88rem;
  color: var(--text);
  outline: none;
  transition: all 0.2s;
  backdrop-filter: blur(12px);
}
.form-field input:focus, .form-field textarea:focus {
  border-color: rgba(200,220,255,0.3);
  box-shadow: 0 0 0 4px rgba(200,220,255,0.06);
  background: rgba(255,255,255,0.08);
}
.form-field input::placeholder, .form-field textarea::placeholder { color: rgba(120,128,168,0.45); }
.form-field textarea { min-height: 130px; resize: vertical; }

.form-btn {
  align-self: center;
  margin-top: 0.6rem;
  padding: 1rem 3.2rem;
  background: linear-gradient(135deg, var(--i1), var(--i3), var(--i2));
  background-size: 250% 250%;
  color: #080c18;
  border: none;
  border-radius: 999px;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s;
  box-shadow: 0 6px 26px rgba(168,200,240,0.35);
}
.form-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(168,200,240,0.5); }

/* FOOTER */
.footer {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--border);
  padding: 2.2rem 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(8,12,24,0.8);
  backdrop-filter: blur(16px);
}
.footer-name {
  font-family: 'Roboto Mono', monospace;
  font-size: 0.95rem;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: var(--muted);
}
.footer-copy {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.1em;
}

/* REVEAL */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.on { opacity: 1; transform: translateY(0); }

/* STARS */
.star-field {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.star {
  position: absolute;
  border-radius: 999px;
  opacity: 0;
  transform: scale(0);
  transition: opacity 1.2s ease, transform 1.2s ease;
}
.star.born {
  opacity: 1;
  transform: scale(1);
}
.star.twinkle {
  animation: twinkle var(--dur, 3s) ease-in-out infinite var(--delay, 0s);
}
@keyframes twinkle {
  0%,100% { opacity: 0.9; transform: scale(1); }
  50%      { opacity: 0.2; transform: scale(0.6); }
}
`;

const WORKS = [
  { id: "c1", cat: "Category", title: "Project Title One",   desc: "A brief description of this work. Replace with your own text to describe the piece, publication, or project." },
  { id: "c2", cat: "Category", title: "Project Title Two",   desc: "A brief description of this work. Replace with your own text to describe the piece, publication, or project." },
  { id: "c3", cat: "Category", title: "Project Title Three", desc: "A brief description of this work. Replace with your own text to describe the piece, publication, or project." },
  { id: "c4", cat: "Category", title: "Project Title Four",  desc: "A brief description of this work. Replace with your own text to describe the piece, publication, or project." },
];

function fmtTime(s) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ":" + (sec < 10 ? "0" : "") + sec;
}

function MusicPlayer() {
  const [playing,   setPlaying]   = useState(false);
  const [current,  setCurrent]   = useState(0);
  const [duration, setDuration]  = useState(0);
  const [src,      setSrc]       = useState("");
  const [title,    setTitle]     = useState("No track loaded");
  const [artist,   setArtist]    = useState("Upload a song to begin");
  const audioRef = useRef(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrent(a.currentTime);
    const onLoad = () => setDuration(a.duration);
    const onEnd  = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onLoad);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onLoad);
      a.removeEventListener("ended", onEnd);
    };
  }, [src]);

  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSrc(url);
    setTitle(file.name.replace(/\.[^.]+$/, ""));
    setArtist("Your Upload");
    setCurrent(0);
    setPlaying(false);
    setTimeout(() => {
      audioRef.current.load();
    }, 50);
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!src) return;
    if (playing) { a.pause(); setPlaying(false); }
    else         { a.play(); setPlaying(true); }
  };

  const skip = secs => {
    if (!src) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + secs));
  };

  const seek = e => {
    if (!src || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * duration;
  };

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div className="player-wrap">
      <div className="player reveal">
        <p className="player-header">Now Playing</p>
        <div className="player-track">
          <div className="player-art">&#9835;</div>
          <div className="player-info">
            <div className="player-title">{title}</div>
            <div className="player-artist">{artist}</div>
          </div>
          <div className="player-controls">
            <button className="ctrl-btn" onClick={() => skip(-10)} title="Back 10s">&#10226;</button>
            <button className="ctrl-btn play" onClick={togglePlay}>
              {playing ? "&#10074;&#10074;" : "&#9654;"}
            </button>
            <button className="ctrl-btn" onClick={() => skip(10)} title="Forward 10s">&#10227;</button>
          </div>
        </div>
        <div className="player-progress">
          <span className="prog-time">{fmtTime(current)}</span>
          <div className="prog-track" onClick={seek}>
            <div className="prog-fill" style={{ width: pct + "%" }} />
          </div>
          <span className="prog-time" style={{ textAlign: "right" }}>{fmtTime(duration)}</span>
        </div>
        <div className="player-upload">
          <label className="upload-btn">
            &#8593; Upload Song
            <input type="file" accept="audio/*" onChange={handleFile} />
          </label>
          <span className="upload-hint">MP3, WAV, AAC supported</span>
        </div>
        <audio ref={audioRef} src={src} />
      </div>
    </div>
  );
}

// Generate a fixed set of star configs once
const STAR_CONFIGS = Array.from({ length: 80 }, (_, i) => {
  const size  = Math.random() < 0.15 ? 3 : Math.random() < 0.4 ? 2 : 1;
  const color = ["#ffffff","#c8deff","#e8d8ff","#b8f0e8","#fff0c0"][Math.floor(Math.random()*5)];
  const dur   = (2.5 + Math.random() * 4).toFixed(1) + "s";
  const delay = (Math.random() * 4).toFixed(1) + "s";
  return {
    id: i,
    top:  (Math.random() * 100).toFixed(2) + "%",
    left: (Math.random() * 100).toFixed(2) + "%",
    size,
    color,
    dur,
    delay,
    revealDelay: Math.random() * 800,
  };
});

function StarField({ sectionRef }) {
  const [born, setBorn] = useState([]);

  useEffect(() => {
    const el = sectionRef?.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        STAR_CONFIGS.forEach(s => {
          setTimeout(() => {
            setBorn(prev => [...prev, s.id]);
          }, s.revealDelay);
        });
        obs.disconnect();
      }
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [sectionRef]);

  return (
    <div className="star-field" aria-hidden="true">
      {STAR_CONFIGS.map(s => (
        <div
          key={s.id}
          className={"star" + (born.includes(s.id) ? " born twinkle" : "")}
          style={{
            top: s.top,
            left: s.left,
            width: s.size + "px",
            height: s.size + "px",
            background: s.color,
            boxShadow: s.size >= 2 ? "0 0 " + (s.size * 3) + "px " + s.color : "none",
            "--dur": s.dur,
            "--delay": s.delay,
          }}
        />
      ))}
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("on"), i * 90);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function WorkCard({ id, cat, title, desc }) {
  return (
    <div className={"card " + id}>
      <div className="card-thumb">
        <div className="card-thumb-inner">
          <div className="thumb-orb orb-a" />
          <div className="thumb-orb orb-b" />
          <div className="thumb-orb orb-c" />
        </div>
      </div>
      <div className="card-body">
        <p className="card-cat">{cat}</p>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>
      </div>
    </div>
  );
}

function SectionStars() {
  const ref = useRef(null);
  return (
    <div ref={ref} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      <StarField sectionRef={ref} />
    </div>
  );
}
function AboutStars() { return <SectionStars />; }
function WorksStars()  { return <SectionStars />; }

export default function Portfolio() {
  useReveal();
  const starRef = useRef(null);

  return (
    <>
      <style>{CSS}</style>

      <div className="bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
        <div className="blob blob-5" />
      </div>

      <nav className="nav">
        <a href="#home" className="nav-logo">B<span>S</span></a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#works">Works</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section className="hero" id="home" ref={starRef} style={{ position: "relative" }}>
        <StarField sectionRef={starRef} />
        <div className="hero-inner">
          <div className="pill">
            <span className="pill-dot" />
            Available for projects
          </div>
          <p className="hero-tag">Writer &amp; Storyteller</p>
          <h1 className="hero-name">B S</h1>
          <p className="hero-bio">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="hero-btns">
            <a href="#works" className="btn-main">View Works</a>
            <a href="#contact" className="btn-ghost">Get in touch</a>
          </div>
        </div>
      </section>

      <section className="about" id="about" style={{ position: "relative" }}>
        <AboutStars />
        <div className="morph" />
        <div>
          <p className="about-label reveal">About</p>
          <h2 className="about-heading reveal">
            A writer of <em>words</em> that linger
          </h2>
          <p className="about-text reveal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="about-text reveal">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
          </p>
        </div>
      </section>

      <section className="works" id="works" style={{ position: "relative" }}>
        <WorksStars />
        <div className="works-head reveal">
          <p className="works-label">Selected Works</p>
          <h2 className="works-title">Stories &amp; Projects</h2>
        </div>
        <div className="grid">
          {WORKS.map(w => <WorkCard key={w.id} {...w} />)}
        </div>
      </section>

      <MusicPlayer />

      <section className="contact" id="contact">
        <p className="contact-label reveal">Get in touch</p>
        <div className="contact-divider reveal" />
        <h2 className="contact-heading reveal">
          Let&rsquo;s create something <em>beautiful</em>
        </h2>
        <p className="contact-sub reveal">
          Whether you have a project in mind or simply want to connect, I would love to hear from you.
        </p>
        <form className="form reveal" onSubmit={e => e.preventDefault()}>
          <div className="form-row">
            <div className="form-field">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" />
            </div>
          </div>
          <div className="form-field">
            <label>Subject</label>
            <input type="text" placeholder="What is this about?" />
          </div>
          <div className="form-field">
            <label>Message</label>
            <textarea placeholder="Tell me about your project or idea..." />
          </div>
          <button type="submit" className="form-btn">Send Message</button>
        </form>
      </section>

      <footer className="footer">
        <span className="footer-name">B S &mdash; Writer</span>
        <span className="footer-copy">&copy; 2026. All rights reserved.</span>
      </footer>
    </>
  );
}
