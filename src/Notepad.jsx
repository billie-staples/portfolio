import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@300;400;500&family=EB+Garamond:ital,wght@0,400;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body, #root {
  min-height: 100vh;
  background: #e8e0d0;
}

/* PAGE */
.notepad-page {
  min-height: 100vh;
  background: #e8e0d0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.5rem 6rem;
  position: relative;
}

/* BACK BUTTON */
.back-btn {
  position: fixed;
  top: 1.6rem;
  left: 1.8rem;
  font-family: 'Caveat', cursive;
  font-size: 1rem;
  font-weight: 400;
  color: #8a7a6a;
  text-decoration: none;
  letter-spacing: 0.04em;
  cursor: pointer;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  z-index: 100;
  transition: color 0.2s;
}
.back-btn:hover { color: #3a2e22; }

/* PAPER */
.paper {
  width: 100%;
  max-width: 680px;
  background: #faf8f2;
  border-radius: 3px;
  box-shadow:
    0 2px 6px rgba(0,0,0,0.08),
    0 8px 32px rgba(0,0,0,0.1),
    2px 0 0 #d4c9b4 inset;
  position: relative;
  padding: 3rem 3.5rem 4rem 5rem;
  overflow: hidden;
}

/* RED MARGIN LINE */
.paper::before {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  left: 3.8rem;
  width: 1px;
  background: rgba(220, 80, 80, 0.3);
}

/* RULED LINES */
.paper::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 31px,
    rgba(100, 140, 200, 0.12) 31px,
    rgba(100, 140, 200, 0.12) 32px
  );
  background-position: 0 3.2rem;
  pointer-events: none;
  z-index: 0;
}

/* SPIRAL HOLES */
.holes {
  position: absolute;
  top: 0; bottom: 0;
  left: 0;
  width: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 2.2rem;
  gap: 3.2rem;
  z-index: 2;
}
.hole {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e8e0d0;
  border: 1px solid #c8bfb0;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.15);
  flex-shrink: 0;
}

/* CONTENT */
.notepad-content {
  position: relative;
  z-index: 1;
}

/* HEADING */
.notepad-title {
  font-family: 'Caveat', cursive;
  font-size: 2.4rem;
  font-weight: 500;
  color: #2a2018;
  line-height: 2rem;
  margin-bottom: 2rem;
  letter-spacing: 0.02em;
}
.notepad-title span {
  font-weight: 300;
  color: #8a7a6a;
  font-size: 1.1rem;
  display: block;
  margin-top: 0.3rem;
}

/* SECTION LABEL */
.notepad-label {
  font-family: 'Caveat', cursive;
  font-size: 0.78rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(220, 80, 80, 0.5);
  margin-bottom: 0.5rem;
  margin-top: 2.5rem;
}
.notepad-label:first-of-type { margin-top: 0; }

/* ENTRY */
.notepad-entry {
  margin-bottom: 0.2rem;
  padding: 0.9rem 0;
  border-bottom: none;
}
.entry-title {
  font-family: 'Caveat', cursive;
  font-size: 1.45rem;
  font-weight: 500;
  color: #2a2018;
  line-height: 1.3;
  margin-bottom: 0.15rem;
}
.entry-sub {
  font-family: 'Caveat', cursive;
  font-size: 1.05rem;
  font-weight: 300;
  color: #8a7a6a;
  line-height: 1.6;
}
.entry-meta {
  font-family: 'Caveat', cursive;
  font-size: 0.88rem;
  font-weight: 300;
  color: #b0a090;
  margin-top: 0.15rem;
}

/* DOODLE UNDERLINE */
.doodle-line {
  width: 100%;
  height: 2px;
  margin: 0.1rem 0 0.6rem;
  background: none;
  border: none;
  border-bottom: 1.5px solid rgba(100,140,200,0.13);
}

/* STICKY NOTE */
.sticky {
  background: #fff8c0;
  padding: 1rem 1.2rem;
  border-radius: 2px;
  box-shadow: 2px 3px 8px rgba(0,0,0,0.1);
  margin-top: 2.5rem;
  transform: rotate(-1.2deg);
  display: inline-block;
  max-width: 280px;
}
.sticky p {
  font-family: 'Caveat', cursive;
  font-size: 1rem;
  font-weight: 400;
  color: #5a4a2a;
  line-height: 1.6;
}

/* PAGE NUMBER */
.page-num {
  position: absolute;
  bottom: 1.5rem;
  right: 2.5rem;
  font-family: 'Caveat', cursive;
  font-size: 0.85rem;
  color: #b0a090;
  z-index: 2;
}

/* FADE IN */
.paper {
  animation: paper-in 0.6s ease forwards;
}
@keyframes paper-in {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
`

const SECTIONS = [
  {
    label: 'Writing',
    entries: [
      { title: 'Title of work', sub: 'Description of the piece — what it is, where it was published.', meta: '2025' },
      { title: 'Title of work', sub: 'Description of the piece — what it is, where it was published.', meta: '2024' },
      { title: 'Title of work', sub: 'Description of the piece — what it is, where it was published.', meta: '2024' },
    ],
  },
  {
    label: 'Projects',
    entries: [
      { title: 'Title of project', sub: 'A line or two about what this was and your role in it.', meta: '2025' },
      { title: 'Title of project', sub: 'A line or two about what this was and your role in it.', meta: '2023' },
    ],
  },
  {
    label: 'Other',
    entries: [
      { title: 'Title', sub: 'Anything else worth noting.', meta: '' },
    ],
  },
]

export default function Notepad() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.background = '#e8e0d0'
    return () => { document.body.style.background = '' }
  }, [])

  return (
    <>
      <style>{CSS}</style>

      <div className="notepad-page">

        <button className="back-btn" onClick={() => navigate('/')}>
          &#8592; back
        </button>

        <div className="paper">

          {/* Spiral holes */}
          <div className="holes">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="hole" />
            ))}
          </div>

          {/* Page number */}
          <div className="page-num">1</div>

          <div className="notepad-content">

            <h1 className="notepad-title">
              Works
              <span>Billie Staples — add your text below</span>
            </h1>

            {SECTIONS.map((section) => (
              <div key={section.label}>
                <p className="notepad-label">{section.label}</p>
                {section.entries.map((entry, i) => (
                  <div key={i}>
                    <div className="notepad-entry">
                      <div className="entry-title">{entry.title}</div>
                      <div className="entry-sub">{entry.sub}</div>
                      {entry.meta && <div className="entry-meta">{entry.meta}</div>}
                    </div>
                    <div className="doodle-line" />
                  </div>
                ))}
              </div>
            ))}

            <div className="sticky">
              <p>to do: fill this in &#10003;</p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
