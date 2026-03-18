import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body, #root {
  width: 100%;
  height: 100%;
  background: #ffffff;
  overflow-x: hidden;
}

/* FULL PAGE NOTEPAD */
.notepad-page {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* BACK BUTTON — symbol only */
.back-btn {
  position: fixed;
  top: 1.2rem;
  left: 1.4rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  color: #aaa;
  font-size: 1.1rem;
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, color 0.2s;
  line-height: 1;
}
.back-btn:hover {
  border-color: #999;
  color: #333;
}

/* BINDING STRIP */
.binding {
  width: 100%;
  height: 40px;
  background: #f7f7f5;
  border-bottom: 1px solid #e8e8e4;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  flex-shrink: 0;
}
.ring {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid #d0d0d0;
  background: #ffffff;
}

/* RULED BODY */
.ruled {
  flex: 1;
  position: relative;
  overflow: hidden;
}

/* RULED LINES — full page */
.ruled::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 39px,
    #ececec 39px,
    #ececec 40px
  );
  pointer-events: none;
  z-index: 0;
}

/* RED MARGIN LINE */
.ruled::before {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  left: 5rem;
  width: 1px;
  background: rgba(210, 90, 90, 0.15);
  z-index: 1;
}

/* CONTENT */
.notepad-inner {
  position: relative;
  z-index: 2;
  padding: 0.8rem 4rem 6rem 6.5rem;
  min-height: calc(100vh - 40px);
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
  font-size: 0.88rem;
  font-weight: 300;
  color: #c8c8c8;
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
  white-space: pre-wrap;
  word-break: break-word;
  letter-spacing: 0.02em;
}

.text-placeholder {
  color: #d8d8d8;
}

/* PAGE NUMBER — bottom right */
.page-num {
  position: fixed;
  bottom: 1.4rem;
  right: 1.8rem;
  font-family: 'Caveat', cursive;
  font-size: 0.8rem;
  color: #d0d0d0;
  letter-spacing: 0.1em;
  z-index: 100;
}
`

export default function Notepad() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.background = '#ffffff'
    return () => {
      document.body.style.background = ''
    }
  }, [])

  return (
    <>
      <style>{CSS}</style>

      <div className="notepad-page">
        {/* Symbol-only back button */}
        <button className="back-btn" onClick={() => navigate('/')}>
          &#8592;
        </button>

        {/* Page number */}
        <div className="page-num">1</div>

        {/* Ring binding */}
        <div className="binding">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="ring" />
          ))}
        </div>

        {/* Full page ruled area */}
        <div className="ruled">
          <div className="notepad-inner">
            <div className="notepad-heading">Billie Staples</div>
            <div className="notepad-date">— your text below —</div>
            <div className="text-area">
              <span className="text-placeholder">Your text goes here...</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
