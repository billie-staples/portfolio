import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body, #root {
  height: 100%;
  background: #f5f5f0;
}

.notepad-page {
  min-height: 100vh;
  background: #f5f5f0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 4rem 1.5rem 6rem;
}

/* BACK */
.back-btn {
  position: fixed;
  top: 1.6rem;
  left: 1.8rem;
  font-family: 'Caveat', cursive;
  font-size: 1rem;
  color: #aaa;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 100;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.back-btn:hover { color: #333; }

/* NOTEPAD */
.notepad {
  width: 100%;
  max-width: 700px;
  background: #ffffff;
  border-radius: 2px;
  box-shadow:
    0 1px 3px rgba(0,0,0,0.06),
    0 12px 40px rgba(0,0,0,0.08);
  position: relative;
  animation: fadein 0.5s ease forwards;
}
@keyframes fadein {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* TOP BINDING STRIP */
.binding {
  width: 100%;
  height: 36px;
  background: #f0f0ec;
  border-bottom: 1px solid #e0e0da;
  border-radius: 2px 2px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.8rem;
}
.ring {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid #ccc;
  background: #f5f5f0;
}

/* RULED AREA */
.ruled {
  position: relative;
  overflow: hidden;
}
.ruled::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 39px,
    #ebebea 39px,
    #ebebea 40px
  );
  pointer-events: none;
  z-index: 0;
}
.ruled::before {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  left: 4.2rem;
  width: 1px;
  background: rgba(210, 100, 100, 0.18);
  z-index: 1;
}

/* INNER CONTENT */
.notepad-inner {
  position: relative;
  z-index: 2;
  padding: 1rem 3rem 4rem 5.5rem;
}

.notepad-heading {
  font-family: 'Caveat', cursive;
  font-size: 1.9rem;
  font-weight: 500;
  color: #1a1a1a;
  line-height: 40px;
  letter-spacing: 0.01em;
}

.notepad-date {
  font-family: 'Caveat', cursive;
  font-size: 0.9rem;
  font-weight: 300;
  color: #c0c0c0;
  line-height: 40px;
  letter-spacing: 0.06em;
  margin-bottom: 40px;
}

.text-area {
  font-family: 'Caveat', cursive;
  font-size: 1.15rem;
  font-weight: 300;
  color: #2a2a2a;
  line-height: 40px;
  width: 100%;
  min-height: 680px;
  white-space: pre-wrap;
  word-break: break-word;
  letter-spacing: 0.02em;
}

.text-placeholder { color: #d0d0d0; }

.page-num {
  font-family: 'Caveat', cursive;
  font-size: 0.8rem;
  color: #ccc;
  text-align: center;
  padding: 1rem 0 1.4rem;
  border-top: 1px solid #f0f0ec;
  letter-spacing: 0.1em;
}
`

export default function Notepad() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.background = '#f5f5f0'
    return () => {
      document.body.style.background = ''
    }
  }, [])

  return (
    <>
      <style>{CSS}</style>

      <div className="notepad-page">
        <button className="back-btn" onClick={() => navigate('/')}>
          &#8592; back
        </button>

        <div className="notepad">
          <div className="binding">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="ring" />
            ))}
          </div>

          <div className="ruled">
            <div className="notepad-inner">
              <div className="notepad-heading">Billie Staples</div>
              <div className="notepad-date">— add your text below —</div>

              <div className="text-area">
                <span className="text-placeholder">
                  Your text goes here. Write as much as you like — the page will
                  grow with you.
                </span>
              </div>
            </div>
          </div>

          <div className="page-num">1</div>
        </div>
      </div>
    </>
  )
}
