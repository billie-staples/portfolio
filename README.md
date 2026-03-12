A personal portfolio website for a writer and storyteller. Built with React and Vite, featuring a dark moon/night sky aesthetic, iridescent colour palette, collage-style layout, scroll-triggered star animations, and a built-in music player.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Customisation Guide](#customisation-guide)
- [Music Player](#music-player)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

---

## Overview

This portfolio is a single-page React application designed to showcase written works and invite collaboration. The design language draws on themes of night, moonlight, and quiet creativity — using deep navy backgrounds, iridescent gradients, glassmorphism cards, and a starfield that animates as you scroll.

---

## Features

- **Hero section** — large iridescent name display, tagline, bio, and call-to-action buttons
- **Collage cards** — floating glassmorphism pieces including an about card, location tag, and quote, arranged around the hero
- **Morphing orb** — an animated iridescent shape in the top right corner of the hero
- **Works grid** — 2x2 collage-style project cards, each slightly tilted, that straighten on hover
- **Music player** — upload and play MP3, WAV, or AAC files with play/pause, skip ±10s, and a seek bar. Supports a default preloaded track.
- **Contact form** — name, email, subject, and message fields
- **Star system** — 90 stars per section that fade in with staggered delays as each section scrolls into view, each twinkling on its own rhythm
- **Animated background blobs** — soft drifting radial gradients behind all content
- **Fully centred responsive layout**

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool and dev server |
| [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) | Display / heading font |
| [Jost](https://fonts.google.com/specimen/Jost) | Body font |
| CSS-in-JS (template literal) | All styles live inside `App.jsx` |

No external component libraries or CSS frameworks are used. Everything is hand-written in a single file.

---
