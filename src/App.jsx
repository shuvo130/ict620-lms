import { useState } from 'react'
import './App.css'

function App() {
  const [fontSize, setFontSize] = useState(16)
  const [fontType, setFontType] = useState('Arial')
  const [textColor, setTextColor] = useState('#222222')
  const [highlightColor, setHighlightColor] = useState('#ffffff')
  const [showTTS, setShowTTS] = useState(false)
  const [speechRate, setSpeechRate] = useState(1)
  const [focusMode, setFocusMode] = useState(false)
  const [showToolbar, setShowToolbar] = useState(true)

  const readAloud = () => {
    const content = document.querySelector('.main-content')

    if (!content) return

    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(content.innerText)
    speech.rate = speechRate

    window.speechSynthesis.speak(speech)
  }

  const toggleSpeech = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
    } else {
      window.speechSynthesis.pause()
    }
  }
  const resetAccessibility = () => {
    setFontSize(16)
    setFontType('Arial')
    setTextColor('#222222')
    setHighlightColor('#ffffff')
    setSpeechRate(1)
    setFocusMode(false)
    setShowTTS(false)

    window.speechSynthesis.cancel()
  }

  return (
    <div className="lms-page">

      <header className="lms-header">
        <h1>My Murdoch Learning</h1>

        <nav className="top-nav">
          <span>Dashboard</span>
          <span>My units</span>
          <span>Student help</span>
        </nav>
      </header>

      <section className="course-header">
        <h2>ICT513 Data analytics (S2, 2026)</h2>
      </section>

      <div className="course-tabs">
        <span className="active-tab">Unit</span>
        <span>Participants</span>
        <span>Grades</span>
      </div>

      {showToolbar ? (
        <div className="accessibility-toolbar">

          <div className="toolbar-select-group">
            <span className="toolbar-label">Font type</span>

            <select
              className="toolbar-select"
              value={fontType}
              onChange={(e) => setFontType(e.target.value)}
              aria-label="Change font type"
            >
              <option value="Arial">Arial</option>
              <option value="Inter">Inter</option>
              <option value="Abel">Abel</option>
              <option value="Abhaya Libre">Abhaya Libre</option>
              <option value="Abyssinica SIL">Abyssinica SIL</option>
              <option value="Alan Sans">Alan Sans</option>
              <option value="Alatsi">Alatsi</option>
            </select>
          </div>

          <div className="toolbar-select-group">
            <span className="toolbar-label">Font size</span>

            <select
              className="toolbar-select"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              aria-label="Change text size"
            >
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
            </select>
          </div>

          <label className="toolbar-icon" title="Text colour">
            <span>A</span>

            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              aria-label="Choose text colour"
              className="color-input"
            />
          </label>

          <label className="toolbar-icon" title="Highlight colour">
            <span>🖍</span>

            <input
              type="color"
              value={highlightColor}
              onChange={(e) => setHighlightColor(e.target.value)}
              aria-label="Choose highlight colour"
              className="color-input"
            />
          </label>

          <button
            className="toolbar-icon"
            title="Read aloud"
            onClick={() => {
              setShowTTS(!showTTS)
              readAloud()
            }}
          >
            🔊
          </button>

          <button
            className="toolbar-icon"
            title="Focus mode"
            onClick={() => setFocusMode(!focusMode)}
          >
            ⛶
          </button>

          <button
            className="toolbar-icon"
            title="Reset accessibility settings"
            onClick={resetAccessibility}
          >
            ↻
          </button>

          <button
            className="toolbar-icon"
            title="Close toolbar"
            onClick={() => {
              setShowToolbar(false)
              setShowTTS(false)
              window.speechSynthesis.cancel()
            }}
          >
            ✕
          </button>

        </div>
      ) : (
        <button
          className="open-toolbar-button"
          onClick={() => setShowToolbar(true)}
        >
          Accessibility ⚙
        </button>
      )}

      {showTTS && (
        <div className="tts-panel">
          <div className="tts-title">Read this page</div>

          <div className="tts-controls">
            <button title="Previous">⏮</button>
            <button
              title="Pause or play"
              onClick={toggleSpeech}
            >
              ⏯
            </button>
            <button title="Next">⏭</button>

            <div className="tts-speed">
              <label htmlFor="speech-speed">Speed:</label>

              <select
                id="speech-speed"
                value={speechRate}
                onChange={(e) => setSpeechRate(Number(e.target.value))}
              >
                <option value="0.75">Slow</option>
                <option value="1">Medium</option>
                <option value="1.5">Fast</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className={`lms-layout ${focusMode ? 'focus-mode' : ''}`}>

        <aside className="left-sidebar">
          <h3>Unit contents</h3>
          <p>Unit information</p>
          <p>Forum</p>
          <p>Week 1</p>
          <p>Week 2</p>
          <p>Week 3</p>
          <p>Week 4</p>
          <p>Week 5</p>
          <p>Week 6</p>
          <p>Week 7</p>
          <p>Week 8</p>
          <p>Week 9</p>
          <p>Week 10</p>
          <p>Assignments</p>
          <p>Datasets</p>
        </aside>

        <main
          className="main-content"
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: fontType,
            color: textColor,
            backgroundColor: highlightColor
          }}
        >
          <h2>Unit Information</h2>

          <p>
            Welcome to ICT513 Data Analytics. This unit introduces
            students to data analytics concepts, methods and practical
            activities.
          </p>

          <div className="week-card">
            <h3>Week 1</h3>
            <p>Introduction to Data Analytics</p>
          </div>

          <div className="week-card">
            <h3>Week 2</h3>
            <p>Data preparation and exploration</p>
          </div>

          <div className="week-card">
            <h3>Week 3</h3>
            <p>Data visualisation</p>
          </div>
        </main>

        <aside className="right-sidebar">
          <div className="side-card">
            <h3>Unit contacts</h3>
            <p>Unit Coordinator</p>
            <p>Teaching Team</p>
          </div>

          <div className="side-card">
            <h3>Class recordings</h3>
            <p>View class recordings</p>
          </div>

          <div className="side-card">
            <h3>Latest announcements</h3>
            <p>No new announcements</p>
          </div>

          <div className="side-card">
            <h3>Upcoming events</h3>
            <p>View upcoming activities</p>
          </div>
        </aside>

      </div>

    </div>
  )
}

export default App