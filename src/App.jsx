import { useState, useEffect, useRef } from 'react'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --i1: #c8deff;
  --i2: #b8f0e8;
  --i3: #e8d8ff;
  --i4: #fff0c0;
  --i5: #c0e8ff;
  --text:  #e8eaf4;
  --muted: #7880a8;
  --bg:    #080c18;
  --border: rgba(180,200,255,0.1);
}

html { scroll-behavior: smooth; }

body {
  font-family: 'Jost', sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

#root {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* BACKGROUND BLOBS */
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
  opacity: 0.15;
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
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 1.4rem 2rem;
  background: transparent;
  border-bottom: none;
}
.nav-logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 0.08em;
  text-decoration: none;
  background: linear-gradient(135deg, var(--i1), var(--i2), var(--i3));
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: iris 8s ease infinite;
}
.nav-logo span { font-style: italic; }
.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}
.nav-links a {
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  background: linear-gradient(135deg, var(--i1), var(--i3));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0.65;
  transition: opacity 0.2s;
}
.nav-links a:hover { opacity: 1; }

section { position: relative; z-index: 1; width: 100%; display: flex; flex-direction: column; align-items: center; }

/* HERO + COLLAGE combined */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 7rem 2rem 4rem;
  text-align: center;
  position: relative;
  overflow: visible;
  width: 100%;
}

/* two column inner layout */
.hero-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* name + tag centred */
.hero-top {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 420px;
  flex-shrink: 0;
  text-align: center;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  margin: 0 auto 1.4rem auto;
  align-self: center;
}
.pill-dot {
  width: 6px; height: 6px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--i1), var(--i2));
  animation: blink 2.4s ease infinite;
}
@keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.6)} }

.hero-tag {
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.8rem;
}
.hero-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(5rem, 13vw, 10rem);
  font-weight: 300;
  line-height: 0.9;
  letter-spacing: -0.02em;
  margin-bottom: 1.4rem;
  background: linear-gradient(135deg, var(--i1) 0%, var(--i3) 40%, var(--i2) 70%, var(--i5) 100%);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: iris 8s ease infinite;
}
@keyframes iris { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

.hero-bio {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-style: italic;
  font-weight: 300;
  line-height: 1.8;
  color: var(--muted);
  max-width: 480px;
  margin: 0 auto 2rem auto;
  text-align: center;
}
.hero-btns {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.btn-main {
  padding: 0.85rem 2.2rem;
  background: linear-gradient(135deg, var(--i1), var(--i3));
  color: #080c18;
  border: none;
  border-radius: 999px;
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.25s, box-shadow 0.25s;
  box-shadow: 0 6px 24px rgba(200,220,255,0.2);
}
.btn-main:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(200,220,255,0.3); }

.btn-ghost {
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  border-bottom: 1px solid rgba(180,200,255,0.2);
  padding-bottom: 2px;
  transition: color 0.2s, border-color 0.2s;
}
.btn-ghost:hover { color: var(--text); border-color: var(--i1); }

/* COLLAGE BOARD - right column beside hero name */
.collage-board {
  position: relative;
  width: 100%;
  max-width: 480px;
  height: 300px;
  flex-shrink: 0;
  z-index: 1;
}

.piece {
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 1.4rem;
  position: absolute;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  box-shadow: 0 8px 32px rgba(0,0,0,0.45);
  cursor: default;
}
.piece:hover {
  z-index: 10 !important;
  box-shadow: 0 20px 60px rgba(200,220,255,0.14);
}

/* piece positions - right column layout */
.piece-bio {
  width: 220px;
  top: 0px;
  left: 0;
  z-index: 3;
  transform: rotate(-1.5deg);
}
.piece-bio:hover { transform: rotate(0deg) translateY(-4px) !important; }

.piece-morph {
  width: 160px;
  height: 160px;
  top: 80px;
  right: 40px;
  left: auto;
  z-index: 4;
  transform: rotate(3deg);
  border-radius: 999px;
  overflow: hidden;
  padding: 0;
  border: none;
  background: none;
  box-shadow: 0 12px 40px rgba(200,220,255,0.18);
  position: absolute;
}
.piece-morph:hover { transform: rotate(0deg) scale(1.06) !important; }

.piece-tag {
  width: 160px;
  top: 0;
  right: 0;
  z-index: 2;
  transform: rotate(2deg);
  text-align: center;
}
.piece-tag:hover { transform: rotate(0deg) translateY(-4px) !important; }

.piece-quote {
  width: 200px;
  bottom: 0px;
  right: 0px;
  z-index: 5;
  transform: rotate(-1.5deg);
}
.piece-quote:hover { transform: rotate(0deg) translateY(-4px) !important; }

/* morph shape */
.morph-shape {
  width: 100%;
  height: 100%;
  border-radius: 60% 40% 55% 45% / 45% 55% 45% 55%;
  background: linear-gradient(135deg, var(--i1), var(--i3), var(--i2), var(--i5));
  background-size: 300% 300%;
  animation: morph 14s ease-in-out infinite, iris 8s ease infinite;
}
@keyframes morph {
  0%,100% { border-radius: 60% 40% 55% 45% / 45% 55% 45% 55%; }
  25%      { border-radius: 45% 55% 40% 60% / 60% 40% 60% 40%; }
  50%      { border-radius: 35% 65% 60% 40% / 50% 60% 40% 60%; }
  75%      { border-radius: 65% 35% 45% 55% / 35% 65% 55% 45%; }
}

.about-label {
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.6rem;
}
.about-heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 0.8rem;
}
.about-heading em {
  font-style: italic;
  background: linear-gradient(135deg, var(--i1), var(--i3));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.about-text {
  font-size: 0.78rem;
  font-weight: 300;
  line-height: 1.85;
  color: var(--muted);
}
.piece-tag-inner {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.85rem;
  font-style: italic;
  color: var(--muted);
  line-height: 1.6;
  margin-top: 0.3rem;
}
.piece-quote-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.95rem;
  font-style: italic;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.7;
}

/* WORKS */
.works-section {
  padding: 3rem 2rem 3rem;
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
}
.works-head {
  text-align: center;
  margin-bottom: 2.5rem;
}
.works-label {
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.5rem;
}
.works-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.8rem;
  font-weight: 300;
}

.works-collage {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  padding: 0.5rem;
}
.work-piece {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  backdrop-filter: blur(16px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
}
.work-piece:nth-child(1) { transform: rotate(-1.2deg); }
.work-piece:nth-child(2) { transform: rotate(1.4deg) translateY(6px); }
.work-piece:nth-child(3) { transform: rotate(0.8deg) translateY(-4px); }
.work-piece:nth-child(4) { transform: rotate(-1.6deg) translateY(4px); }
.work-piece:hover {
  transform: rotate(0deg) translateY(-6px) scale(1.01) !important;
  box-shadow: 0 20px 60px rgba(200,220,255,0.12);
  position: relative;
  z-index: 5;
}

.work-thumb {
  height: 90px;
  position: relative;
  overflow: hidden;
}
.work-thumb-inner {
  position: absolute;
  inset: 0;
  transition: transform 0.5s ease;
}
.work-piece:hover .work-thumb-inner { transform: scale(1.05); }

.wc1 .work-thumb-inner { background: linear-gradient(135deg, #0e1a30 0%, #1a0e30 100%); }
.wc2 .work-thumb-inner { background: linear-gradient(135deg, #061820 0%, #0e2018 100%); }
.wc3 .work-thumb-inner { background: linear-gradient(135deg, #1a0e30 0%, #0e1a30 100%); }
.wc4 .work-thumb-inner { background: linear-gradient(135deg, #18180e 0%, #0e1820 100%); }

.work-orb {
  position: absolute;
  border-radius: 999px;
  background: rgba(200,220,255,0.08);
}
.wo-a { width: 110px; height: 110px; bottom: -28px; right: -18px; }
.wo-b { width: 50px;  height: 50px;  top: 14px; left: 14px; }

.work-body { padding: 1.1rem 1.3rem 1.3rem; }
.work-cat {
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.3rem;
}
.work-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 0.4rem;
}
.work-desc { font-size: 0.74rem; color: var(--muted); line-height: 1.65; }

/* MUSIC PLAYER */
.player-wrap {
  padding: 0 2rem 4rem;
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
}
.player {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 1.8rem 2rem;
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  transform: rotate(-0.4deg);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}
.player-header {
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
}
.player-track { display: flex; align-items: center; gap: 1.2rem; }
.player-art {
  width: 50px; height: 50px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--i1), var(--i3), var(--i2));
  background-size: 200% 200%;
  animation: iris 6s ease infinite;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}
.player-info { flex: 1; min-width: 0; }
.player-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.player-artist { font-size: 0.68rem; color: var(--muted); margin-top: 0.1rem; }
.player-controls { display: flex; align-items: center; gap: 0.8rem; }
.ctrl-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, transform 0.15s;
  padding: 0.2rem;
}
.ctrl-btn:hover { color: var(--text); transform: scale(1.1); }
.ctrl-btn.play {
  width: 40px; height: 40px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--i1), var(--i3));
  color: #080c18;
  font-size: 0.9rem;
  box-shadow: 0 4px 16px rgba(200,220,255,0.2);
}
.player-progress { display: flex; align-items: center; gap: 0.8rem; }
.prog-time { font-size: 0.6rem; color: var(--muted); flex-shrink: 0; width: 30px; }
.prog-track {
  flex: 1; height: 3px;
  background: rgba(180,200,255,0.1);
  border-radius: 999px;
  cursor: pointer;
  overflow: hidden;
}
.prog-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--i1), var(--i3));
  transition: width 0.3s linear;
  pointer-events: none;
}
.player-upload { display: flex; align-items: center; gap: 0.7rem; }
.upload-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.48rem 1rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-family: 'Jost', sans-serif;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}
.upload-btn input { position: absolute; inset: 0; opacity: 0; cursor: pointer; font-size: 0; }
.upload-btn:hover { border-color: var(--i1); color: var(--text); }
.upload-hint { font-size: 0.6rem; color: var(--muted); }

/* CONTACT */
.contact {
  padding: 2rem 2rem 6rem;
  max-width: 580px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.contact-label {
  font-size: 0.6rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.8rem;
}
.contact-divider {
  width: 44px; height: 1px;
  background: linear-gradient(90deg, var(--i1), var(--i3));
  border-radius: 999px;
  margin: 0 auto 1.4rem;
}
.contact-heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 5vw, 3.6rem);
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 1rem;
}
.contact-heading em {
  font-style: italic;
  background: linear-gradient(135deg, var(--i1), var(--i3));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.contact-sub {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.05rem;
  font-style: italic;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.75;
  margin-bottom: 2.2rem;
}
.form { display: flex; flex-direction: column; gap: 0.9rem; text-align: left; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }
.form-field { display: flex; flex-direction: column; gap: 0.32rem; }
.form-field label {
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}
.form-field input, .form-field textarea {
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.75rem 0.95rem;
  font-family: 'Jost', sans-serif;
  font-size: 0.82rem;
  color: var(--text);
  outline: none;
  transition: all 0.2s;
}
.form-field input:focus, .form-field textarea:focus {
  border-color: rgba(200,220,255,0.3);
  box-shadow: 0 0 0 3px rgba(200,220,255,0.06);
  background: rgba(255,255,255,0.07);
}
.form-field input::placeholder, .form-field textarea::placeholder { color: rgba(120,128,168,0.4); }
.form-field textarea { min-height: 100px; resize: vertical; }
.form-btn {
  align-self: center;
  margin-top: 0.4rem;
  padding: 0.85rem 2.6rem;
  background: linear-gradient(135deg, var(--i1), var(--i3), var(--i2));
  background-size: 250% 250%;
  animation: iris 6s ease infinite;
  color: #080c18;
  border: none;
  border-radius: 999px;
  font-family: 'Jost', sans-serif;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s;
  box-shadow: 0 6px 24px rgba(200,220,255,0.2);
}
.form-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(200,220,255,0.3); }

/* FOOTER */
.footer {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--border);
  padding: 1.8rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background: rgba(8,12,24,0.85);
  backdrop-filter: blur(16px);
}
.footer-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.9rem;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: var(--muted);
}
.footer-copy { font-size: 0.62rem; color: var(--muted); letter-spacing: 0.1em; }

/* REVEAL */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.on { opacity: 1; transform: translateY(0); }

/* STARS */
.star-field { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.star {
  position: absolute;
  border-radius: 999px;
  opacity: 0;
  transform: scale(0);
  transition: opacity 1.2s ease, transform 1.2s ease;
}
.star.born { opacity: 1; transform: scale(1); }
.star.twinkle { animation: twinkle var(--dur, 3s) ease-in-out infinite var(--delay, 0s); }
@keyframes twinkle {
  0%,100% { opacity: 0.9; transform: scale(1); }
  50%      { opacity: 0.12; transform: scale(0.4); }
}

`

const WORKS = [
  {
    id: 'wc1',
    cat: 'Theatre',
    title: 'Bravado',
    desc: 'Description, quote, review.',
  },
  {
    id: 'wc2',
    cat: 'Theatre',
    title: 'When the world was wide',
    desc: 'Description, quote, review',
  },
  {
    id: 'wc3',
    cat: 'Theatre',
    title: 'Pig, pig, pig (consent) none of that please',
    desc: 'Description, quote, review',
  },
  {
    id: 'wc4',
    cat: 'Theatre',
    title: 'You First',
    desc: 'Description, quote, review.',
  },
]

function fmtTime(s) {
  if (!isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return m + ':' + (sec < 10 ? '0' : '') + sec
}

const STAR_CONFIGS = Array.from({ length: 250 }, (_, i) => {
  const size = Math.random() < 0.1 ? 3 : Math.random() < 0.35 ? 2 : 1
  const color = ['#ffffff', '#c8deff', '#e8d8ff', '#b8f0e8', '#fff0c0'][
    Math.floor(Math.random() * 5)
  ]
  return {
    id: i,
    top: (Math.random() * 100).toFixed(2) + '%',
    left: (Math.random() * 100).toFixed(2) + '%',
    size,
    color,
    dur: (2.5 + Math.random() * 4).toFixed(1) + 's',
    delay: (Math.random() * 4).toFixed(1) + 's',
    revealDelay: Math.random() * 1000,
  }
})

function StarField({ sectionRef }) {
  const [born, setBorn] = useState([])
  useEffect(() => {
    const el = sectionRef?.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          STAR_CONFIGS.forEach((s) =>
            setTimeout(() => setBorn((prev) => [...prev, s.id]), s.revealDelay)
          )
          obs.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [sectionRef])
  return (
    <div className="star-field" aria-hidden="true">
      {STAR_CONFIGS.map((s) => (
        <div
          key={s.id}
          className={'star' + (born.includes(s.id) ? ' born twinkle' : '')}
          style={{
            top: s.top,
            left: s.left,
            width: s.size + 'px',
            height: s.size + 'px',
            background: s.color,
            boxShadow:
              s.size >= 2 ? '0 0 ' + s.size * 3 + 'px ' + s.color : 'none',
            '--dur': s.dur,
            '--delay': s.delay,
          }}
        />
      ))}
    </div>
  )
}

function SectionStars() {
  const ref = useRef(null)
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <StarField sectionRef={ref} />
    </div>
  )
}

function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [src, setSrc] = useState('Willow_Smith_-_Female_Energy_Music_Video.mp3')
  const [title, setTitle] = useState('Female Energy')
  const [artist, setArtist] = useState('Willow Smith')
  const audioRef = useRef(null)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setCurrent(a.currentTime)
    const onLoad = () => setDuration(a.duration)
    const onEnd = () => setPlaying(false)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onLoad)
    a.addEventListener('ended', onEnd)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onLoad)
      a.removeEventListener('ended', onEnd)
    }
  }, [src])

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setSrc(URL.createObjectURL(file))
    setTitle(file.name.replace(/\.[^.]+$/, ''))
    setArtist('Your Upload')
    setCurrent(0)
    setPlaying(false)
    setTimeout(() => audioRef.current.load(), 50)
  }

  const togglePlay = () => {
    if (!src) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  const skip = (secs) => {
    if (!src) return
    audioRef.current.currentTime = Math.max(
      0,
      Math.min(duration, audioRef.current.currentTime + secs)
    )
  }

  const seek = (e) => {
    if (!src || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audioRef.current.currentTime =
      ((e.clientX - rect.left) / rect.width) * duration
  }

  const pct = duration ? (current / duration) * 100 : 0

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
            <button className="ctrl-btn" onClick={() => skip(-10)}>
              &#10226;
            </button>
            <button className="ctrl-btn play" onClick={togglePlay}>
              {playing ? '||' : '>'}
            </button>
            <button className="ctrl-btn" onClick={() => skip(10)}>
              &#10227;
            </button>
          </div>
        </div>
        <div className="player-progress">
          <span className="prog-time">{fmtTime(current)}</span>
          <div className="prog-track" onClick={seek}>
            <div className="prog-fill" style={{ width: pct + '%' }} />
          </div>
          <span className="prog-time" style={{ textAlign: 'right' }}>
            {fmtTime(duration)}
          </span>
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
  )
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('on'), i * 80)
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function WorkCard({ id, cat, title, desc }) {
  return (
    <div className={'work-piece ' + id}>
      <div className="work-thumb">
        <div className="work-thumb-inner">
          <div className="work-orb wo-a" />
          <div className="work-orb wo-b" />
        </div>
      </div>
      <div className="work-body">
        <p className="work-cat">{cat}</p>
        <h3 className="work-title">{title}</h3>
        <p className="work-desc">{desc}</p>
      </div>
    </div>
  )
}

export default function Portfolio() {
  useReveal()
  const heroRef = useRef(null)
  const worksRef = useRef(null)
  const contactRef = useRef(null)

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

      {/* NAV */}
      <nav className="nav">
        <a href="#home" className="nav-logo">
          B<span>S</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#works">Works</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* HERO + COLLAGE combined */}
      <section className="hero" id="home" ref={heroRef}>
        <SectionStars />

        {/* orb - top right corner of hero */}
        <div className="piece piece-morph">
          <div className="morph-shape" />
        </div>

        {/* hero layout - name left, collage cards right */}
        <div className="hero-inner">
          {/* centred name block */}
          <div className="hero-top reveal">
            <div className="pill">
              <span className="pill-dot" /> Available for projects
            </div>
            <p className="hero-tag">Writer &amp;</p>
            <h1 className="hero-name">Billie Staples</h1>
            <p className="hero-bio">Bio, bio, bio</p>
            <div className="hero-btns">
              <a href="#works" className="btn-main">
                View Works
              </a>
              <a href="#contact" className="btn-ghost">
                Get in touch
              </a>
            </div>
          </div>

          {/* collage pieces alongside the name */}
          <div className="collage-board">
            <div className="piece piece-bio reveal">
              <p className="about-label">About</p>
              <h2 className="about-heading">
                A writer of <em>words</em> that linger
              </h2>
              <p className="about-text">XXXX</p>
            </div>
            <div className="piece piece-tag reveal">
              <p className="about-label">Based in</p>
              <p className="piece-tag-inner">
                Aotearoa, New Zealand &mdash; available worldwide
              </p>
            </div>
            <div className="piece piece-quote reveal">
              <p className="piece-quote-text">"quote".</p>
            </div>
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section
        className="works-section"
        id="works"
        ref={worksRef}
        style={{ position: 'relative' }}
      >
        <SectionStars />
        <div
          className="works-head reveal"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <p className="works-label">Selected Works</p>
          <h2 className="works-title">Stories &amp; Projects</h2>
        </div>
        <div
          className="works-collage"
          style={{ position: 'relative', zIndex: 1 }}
        >
          {WORKS.map((w) => (
            <WorkCard key={w.id} {...w} />
          ))}
        </div>
      </section>

      {/* MUSIC PLAYER */}
      <MusicPlayer />

      {/* CONTACT */}
      <section
        className="contact"
        id="contact"
        ref={contactRef}
        style={{ position: 'relative' }}
      >
        <SectionStars />
        <p
          className="contact-label reveal"
          style={{ position: 'relative', zIndex: 1 }}
        >
          Get in touch
        </p>
        <div
          className="contact-divider reveal"
          style={{ position: 'relative', zIndex: 1 }}
        />
        <h2
          className="contact-heading reveal"
          style={{ position: 'relative', zIndex: 1 }}
        >
          Let&rsquo;s create something <em>beautiful</em>
        </h2>
        <p
          className="contact-sub reveal"
          style={{ position: 'relative', zIndex: 1 }}
        >
          Whether you have a project in mind or simply want to connect, I would
          love to hear from you.
        </p>
        <form
          className="form reveal"
          style={{ position: 'relative', zIndex: 1 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-row">
            <div className="form-field">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input type="email" placeholder="your@gmail.com" />
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
          <button type="submit" className="form-btn">
            Send Message
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span className="footer-name">Billie Staples &mdash; Writer</span>
        <span className="footer-copy">&copy; 2026. All rights reserved.</span>
      </footer>
    </>
  )
}
