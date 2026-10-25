import { useEffect, useRef, useState } from 'react'
import './App.css'

const weeks = [
  { title: 'Week 1', items: [['High', 'Lecture1: Descriptive Statistics', 'PDF'], ['High', 'Workshop 1', 'PDF'], ['High', 'Tutorial 1', 'PDF'], ['High', 'Quiz 1', 'Quiz'], ['Medium', 'Pulse Data', 'File'], ['Low', 'Sampling code', 'File']] },
  { title: 'Week 2', items: [['High', 'Lecture 2: Data preparation', 'PDF'], ['High', 'Workshop 2', 'PDF'], ['Medium', 'Tutorial 2', 'PDF']] },
  { title: 'Week 3', items: [['High', 'Lecture 3: Data visualisation', 'PDF'], ['Medium', 'Workshop 3', 'PDF']] },
  { title: 'Week 4', items: [['High', 'Lecture 4: Probability', 'PDF'], ['Medium', 'Workshop 4', 'PDF']] },
  { title: 'Week 5', items: [['High', 'Lecture 5: Statistical inference', 'PDF']] },
  { title: 'Week 6 (non-teaching week)', items: [] },
  { title: 'Week 7', items: [['High', 'Lecture 7: Regression', 'PDF']] },
  { title: 'Week 8', items: [['High', 'Lecture 8: Model evaluation', 'PDF']] },
  { title: 'Week 9', items: [['High', 'Lecture 9: Clustering', 'PDF']] },
  { title: 'Week 10 (non-teaching week)', items: [] },
]
const sections = ['Unit Information', 'Forum', ...weeks.map(w => w.title), 'Assignments', 'Datasets']
const initialOpen = ['Week 1']
const fonts = ['Arial', 'Inter', 'Abel', 'Georgia', 'Verdana', 'Tahoma', 'OpenDyslexic']

function Icon({ name, size = 19 }) {
  const paths = {
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    message: <><path d="M4 4h16v13H9l-5 4z" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-8 16-8 16 0" /></>,
    chevron: <path d="m9 6 6 6-6 6" />,
    close: <path d="M5 5l14 14M19 5 5 19" />,
    font: <><path d="m4 19 8-15 8 15M7 14h10" /></>,
    marker: <><path d="m4 17 10-12 5 5-10 12H4zM14 5l5 5" /></>,
    speech: <><path d="M5 9h4l5-4v14l-5-4H5zM17 8q5 4 0 8" /></>,
    expand: <><path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5" /></>,
    reset: <><path d="M3 11a9 9 0 1 1 3 7M3 4v7h7" /></>,
    play: <path d="m8 5 11 7-11 7z" />,
    pause: <><path d="M8 5v14M16 5v14" /></>,
    back: <><path d="M6 5v14M19 5 9 12l10 7z" /></>,
    next: <><path d="M18 5v14M5 5l10 7-10 7z" /></>,
    file: <><path d="M6 2h8l5 5v15H6zM14 2v6h5M9 13h7M9 17h7" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

export default function App() {
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [toolbar, setToolbar] = useState(false)
  const [open, setOpen] = useState(initialOpen)
  const [font, setFont] = useState('Arial')
  const [size, setSize] = useState(16)
  const [textColor, setTextColor] = useState('#111111')
  const [highlightColor, setHighlightColor] = useState('#ffff00')
  const [fontColorOpen, setFontColorOpen] = useState(false)
  const [highlightOpen, setHighlightOpen] = useState(false)
  const [focus, setFocus] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [paused, setPaused] = useState(false)
  const [rate, setRate] = useState(1)
  const [completed, setCompleted] = useState([])
  const [activeTab, setActiveTab] = useState('Unit')
  const [notice, setNotice] = useState('')
  const reader = useRef(null)
  const utterance = useRef(null)

  useEffect(() => () => window.speechSynthesis?.cancel(), [])
  const toggle = name => setOpen(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name])
  const reset = () => { setFont('Arial'); setSize(16); setTextColor('#111111'); setHighlightColor('#ffff00'); setFocus(false); setOpen(initialOpen); setCompleted([]); setFontColorOpen(false); setHighlightOpen(false); stopSpeech() }
  const stopSpeech = () => { window.speechSynthesis?.cancel(); setSpeaking(false); setPaused(false) }
  const startSpeech = () => {
    if (!('speechSynthesis' in window)) { setNotice('Text-to-speech is not supported in this browser.'); return }
    stopSpeech()
    const text = reader.current?.innerText?.trim()
    if (!text) return
    const u = new SpeechSynthesisUtterance(text)
    u.rate = rate
    u.onend = () => { setSpeaking(false); setPaused(false) }
    u.onerror = () => { setSpeaking(false); setPaused(false) }
    utterance.current = u
    window.speechSynthesis.speak(u)
    setSpeaking(true)
  }
  const pauseSpeech = () => {
    if (!speaking) { startSpeech(); return }
    if (paused) { window.speechSynthesis.resume(); setPaused(false) }
    else { window.speechSynthesis.pause(); setPaused(true) }
  }
  const changeRate = e => { setRate(Number(e.target.value)); if (speaking) stopSpeech() }
  const jumpTo = name => { setActiveTab('Unit'); setOpen(prev => prev.includes(name) ? prev : [...prev, name]); document.getElementById('section-' + sections.indexOf(name))?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
  const markDone = id => setCompleted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const noticeTimer = useRef(null)

  const placeholder = name => {
    if (noticeTimer.current) {
      clearTimeout(noticeTimer.current)
    }

    setNotice(`${name} is a demonstration placeholder. Connect your real LMS resource to activate it.`)

    noticeTimer.current = setTimeout(() => {
      setNotice('')
      noticeTimer.current = null
    }, 3000)
  }
  const [toolbarPosition, setToolbarPosition] = useState(null)
  const dragOffset = useRef({ x: 0, y: 0 })

  const startToolbarDrag = (e) => {
    if (e.button !== 0) return

    const toolbarElement = e.currentTarget.parentElement
    const rect = toolbarElement.getBoundingClientRect()

    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }

    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const moveToolbarDrag = (e) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return

    const toolbarElement = e.currentTarget.parentElement
    const width = toolbarElement.offsetWidth
    const height = toolbarElement.offsetHeight

    const x = Math.max(
      0,
      Math.min(window.innerWidth - width, e.clientX - dragOffset.current.x)
    )

    const y = Math.max(
      0,
      Math.min(window.innerHeight - height, e.clientY - dragOffset.current.y)
    )

    setToolbarPosition({ x, y })
  }
  return <div className={`site ${focus ? 'focus-mode' : ''}`}>
    <header className="site-header">
      <div className="brand"><span>My</span> Murdoch Learning</div>
      <nav aria-label="Main navigation"><button onClick={() => placeholder('Dashboard')}>Dashboard</button><button onClick={() => placeholder('My units')}>My units</button><button onClick={() => placeholder('Student help')}>Student help</button></nav>
      <div className="header-icons"><button aria-label="Search" onClick={() => placeholder('Search')}><Icon name="search" /></button><button aria-label="Notifications" onClick={() => placeholder('Notifications')}><Icon name="bell" /></button><button aria-label="Messages" onClick={() => placeholder('Messages')}><Icon name="message" /></button><button aria-label="Profile" onClick={() => placeholder('Profile')}><Icon name="user" /></button></div>
    </header>
    {!focus && <>
      {!leftOpen && (
        <button className="edge-toggle edge-left" aria-label="Open navigation" onClick={() => setLeftOpen(true)}>
          <Icon name="menu" />
        </button>
      )}
      {!rightOpen && (
        <button className="edge-toggle edge-right" aria-label="Open information sidebar" onClick={() => setRightOpen(true)}>
          <Icon name="chevron" />
        </button>
      )}
    </>}
    {!focus && leftOpen && <aside className="left-sidebar" aria-label="Course navigation"><div className="sidebar-top"><strong>Course navigation</strong><button aria-label="Close navigation" onClick={() => setLeftOpen(false)}><Icon name="close" /></button></div>{sections.map(name => <button key={name} className="nav-entry" onClick={() => jumpTo(name)}><Icon name="chevron" size={14} />{name}</button>)}</aside>}
    {!focus && rightOpen && <aside className="right-sidebar" aria-label="Course information"><div className="sidebar-top"><strong>Information</strong><button aria-label="Close information" onClick={() => setRightOpen(false)}><Icon name="close" /></button></div><div className="info-card"><strong>Unit contacts</strong><div className="avatar"><Icon name="user" size={38} /></div><b>Unit contacts name</b></div><div className="info-card"><strong>Class recordings</strong><button className="link-card" onClick={() => placeholder('Class videos and lecture recordings')}>Class videos and lecture recordings <Icon name="chevron" /></button></div><div className="info-card"><strong>Latest announcements</strong><p>Please do workshop7<br /><small>16/09/2026</small></p><p>Week8<br /><small>15/09/2026</small></p><p>Please do workshop6<br /><small>15/09/2026</small></p></div><div className="info-card"><strong>Upcoming events</strong><p>ICT513s2_26: WS WEEK9<br /><small>Tuesday, 22 September</small></p><p>ICT513s2_26: WS WEEK10<br /><small>Tuesday, 22 September</small></p></div><div className="info-card"><strong>Activities</strong><p>Assignments<br />Echo links<br />External tools<br />Forums<br />Resources</p></div></aside>}
    <main className="course-shell" style={{ '--content-font': font === 'OpenDyslexic' ? 'Arial' : font, '--content-size': `${size}px`, '--content-color': textColor }}>
      <div className="course-banner"><h1>ICT513 Data analytics (S2, 2026)</h1></div>
      <div className="course-tabs" role="tablist" aria-label="Course tabs">{['Unit', 'Participants', 'Grades'].map(tab => <button role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>)}</div>
      {activeTab !== 'Unit' ? <div className="tab-placeholder"><h2>{activeTab}</h2><p>This is a visual prototype. No live student data is connected.</p></div> : <>
        <div className="welcome" ref={reader}><p>Welcome to ICT513.<br />Please see the Unit Information to know about the unit in detail.<br />To join the live workshops by Teams, please click on the links provided for.<br />The workshop recordings will be available in the lecture recording section.</p><div className="quick-links"><button onClick={() => placeholder('Announcements')}><Icon name="message" size={17} /> Announcements</button><button onClick={() => placeholder('Join to Teams link')}><Icon name="message" size={17} /> Join to Teams' link</button></div>
          <div className="expand-actions"><button onClick={() => setOpen(sections)}>› Open all</button><button onClick={() => setOpen([])}>⌄ Close all</button></div><p className="hint">Instructions: Clicking on the section name will show / hide the section.</p>
          <div className="accordion">{sections.map((name, index) => { const expanded = open.includes(name); const week = weeks.find(w => w.title === name); return <section key={name} id={`section-${index}`} className="accordion-section"><button className="section-heading" aria-expanded={expanded} onClick={() => toggle(name)}><span className={`arrow ${expanded ? 'down' : ''}`}><Icon name="chevron" size={17} /></span>{name}</button>{expanded && <div className="section-body">{week ? (week.items.length ? week.items.map(([priority, label, type], i) => { const id = `${name}-${i}`; const done = completed.includes(id); return <div className="resource" key={id}><span className={`priority ${priority.toLowerCase()}`}>{priority}</span><Icon name="file" size={15} /><button className="resource-name" onClick={() => placeholder(label)}>{label}</button><button className={`done-btn ${done ? 'is-done' : ''}`} onClick={() => markDone(id)}>{done ? <><Icon name="check" size={13} /> Done</> : 'Mark as done'}</button></div> }) : <p className="empty">No scheduled activities this week.</p>) : <p className="empty">{name === 'Unit Information' ? 'ICT513 introduces descriptive statistics, data analysis, visualisation, and practical workshops.' : `No ${name.toLowerCase()} content has been connected to this demonstration.`}</p>}</div>}</section> })}</div>
        </div>
      </>}
    </main>
    <div
      className={`accessibility ${focus ? 'in-focus' : ''} ${toolbarPosition ? 'is-dragged' : ''}`}
      style={toolbarPosition ? {
        left: toolbarPosition.x,
        top: toolbarPosition.y,
        right: 'auto',
        transform: 'none'
      } : undefined}
    >
      {!toolbar ? (
        <button
          className="accessibility-tab"
          aria-label="Open accessibility toolbar"
          onClick={() => setToolbar(true)}
        >
          Accessibility <Icon name="font" size={17} />
        </button>
      ) : (
        <div className="accessibility-bar">
          <button
            type="button"
            className="toolbar-drag-handle"
            title="Drag to move toolbar"
            aria-label="Drag to move accessibility toolbar"
            onPointerDown={startToolbarDrag}
            onPointerMove={moveToolbarDrag}
          >
            ⠿
          </button>

          <label>
            Font type
            <select aria-label="Font type" value={font} onChange={e => setFont(e.target.value)}>
              {fonts.map(f => <option key={f}>{f}</option>)}
            </select>
          </label>

          <label>
            Font size
            <select aria-label="Font size" value={size} onChange={e => setSize(Number(e.target.value))}>
              {[10, 12, 14, 16, 18, 20, 22, 24, 28].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>

          <div className="color-control">
            <button title="Text colour" aria-label="Text colour" onClick={() => { setFontColorOpen(!fontColorOpen); setHighlightOpen(false) }}>
              <Icon name="font" />
            </button>
            {fontColorOpen && (
              <div className="color-pop">
                <label>Text colour <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} /></label>
                <div className="swatches">
                  {['#111111', '#ff0000', '#0066cc', '#27833b', '#7c3aed'].map(c => (
                    <button key={c} style={{ background: c }} aria-label={`Set text colour ${c}`} onClick={() => { setTextColor(c); setFontColorOpen(false) }} />
                  ))}
                </div>
                <button onClick={() => setTextColor('#111111')}>Reset</button>
              </div>
            )}
          </div>

          <div className="color-control">
            <button title="Highlight colour" aria-label="Highlight colour" onClick={() => { setHighlightOpen(!highlightOpen); setFontColorOpen(false) }}>
              <Icon name="marker" />
            </button>
            {highlightOpen && (
              <div className="color-pop">
                <label>Highlight colour <input type="color" value={highlightColor} onChange={e => setHighlightColor(e.target.value)} /></label>
                <div className="swatches">
                  {['#ffff00', '#b4f0e7', '#ffd6d6', '#d8d2ff', '#ffffff'].map(c => (
                    <button key={c} style={{ background: c }} aria-label={`Set highlight colour ${c}`} onClick={() => { setHighlightColor(c); setHighlightOpen(false) }} />
                  ))}
                </div>
                <button onClick={() => setHighlightColor('#ffff00')}>Reset</button>
              </div>
            )}
          </div>

          <button title="Read this page" aria-label="Read this page" onClick={startSpeech}>
            <Icon name="speech" />
          </button>
          <button title="Focus mode" aria-label="Toggle focus mode" onClick={() => { setFocus(!focus); setLeftOpen(false); setRightOpen(false) }}>
            <Icon name="expand" />
          </button>
          <button title="Reset settings" aria-label="Reset settings" onClick={reset}>
            <Icon name="reset" />
          </button>
          <button title="Close toolbar" aria-label="Close toolbar" onClick={() => setToolbar(false)}>
            <Icon name="close" />
          </button>
        </div>
      )}
    </div>
    {speaking && <div className="speech-panel"><span>Read this page</span><button title="Restart" onClick={startSpeech}><Icon name="back" /></button><button title={paused ? 'Resume' : 'Pause'} onClick={pauseSpeech}><Icon name={paused ? 'play' : 'pause'} /></button><button title="Stop" onClick={stopSpeech}><Icon name="next" /></button><label>Speed: <select value={rate} onChange={changeRate}><option value="0.7">Slow</option><option value="1">Medium</option><option value="1.3">Fast</option></select></label></div>}
    {notice && <div className="notice" role="status">{notice}<button aria-label="Dismiss" onClick={() => setNotice('')}><Icon name="close" size={16} /></button></div>}
    <style>{`.welcome ::selection { background: ${highlightColor}; color: ${textColor}; }`}</style>
  </div>
}
