import { useEffect, useRef, useState } from 'react'
import './App.css'
import maxwellImage from './assets/Maxwell.jpeg'
import shirleyImage from './assets/Shirley.jpeg'
import ringsImage from './assets/ring.png'
import crestamarangGardensImage from './assets/Crestamaranggardens.png'
import weAreGettingMarriedImage from './assets/wearegettingmarried1.png'

const wedding = {
  couple: { first: 'Maxwell', second: 'Shirley', monogram: 'M · S', names: 'Maxwell Muhenyeri & Shirley Mfuma' },
  date: '31 October 2026', isoDate: '2026-10-31T15:30:00+02:00',
  invitation: 'Together with their families, Maxwell Muhenyeri and Shirley Mfuma request the pleasure of your company as they join their lives in marriage.',
  scriptures: [{ text: '“Above all, keep loving one another earnestly, since love covers a multitude of sins.”', reference: '1 Peter 4:8' }, { text: '“Delight yourself in the Lord, and he will give you the desires of your heart.”', reference: 'Psalm 37:4' }],
  dressCode: { title: 'African Opulence · shades of brown', note: 'Guest colour palette', attire: 'For the Magadi Celebration, please wear Basadi Botlhe, red tukwi and the white tšale with blue stripes.', colors: [{ name: 'Beige', value: '#C3AB94' }, { name: 'Sand', value: '#AB8C71' }, { name: 'Camel', value: '#B18B66' }, { name: 'Tan', value: '#9E714F' }, { name: 'Caramel', value: '#A16F47' }, { name: 'Mocha', value: '#5E3A25' }, { name: 'Chestnut', value: '#693E29' }, { name: 'Walnut', value: '#4A2A17' }, { name: 'Coffee Brown', value: '#503422' }, { name: 'Chocolate Brown', value: '#381E14' }, { name: 'Espresso', value: '#291810' }, { name: 'Deep Brown', value: '#25120C' }] },
  venue: { name: 'Cresta Marang Gardens', address: 'Francistown, Botswana', description: 'A beautiful garden setting in Francistown for a day of faith, family and celebration.', map: 'https://maps.app.goo.gl/ezw6GAVfmNvCoVny5' },
  events: [
    { time: '30 OCT', name: 'Magadi Celebration', detail: 'Sekakangwe · Matenge Ward', description: 'Attire: Basadi Botlhe, red tukwi and the white tšale with blue stripes.' },
    { time: '31 OCT', name: 'The Wedding Day', detail: 'Cresta Marang Garden · Francistown', description: 'Strictly African wedding-day attire. Celebrate in African opulence with elegant traditional style.' },
    { time: '01 NOV', name: 'Kgoroso', detail: 'Block 3 · Francistown', description: 'A joyful closing celebration for both families.' },
  ],
  families: { bride: 'Together with their families', groom: 'In the presence of God' },
}

function PhotoFrame({ src, alt, className = '', fit = 'cover' }: { src: string; alt: string; className?: string; fit?: 'cover' | 'contain' }) {
  return (
    <div className={`photo-placeholder ${className} ${fit === 'contain' ? 'fit-contain' : 'fit-cover'}`}>
      <img src={src} alt={alt} />
    </div>
  )
}

function Countdown() {
  const remainingTime = () => Math.max(0, new Date(wedding.isoDate).getTime() - Date.now())
  const [remaining, setRemaining] = useState(remainingTime)
  useEffect(() => { const timer = window.setInterval(() => setRemaining(remainingTime()), 1000); return () => window.clearInterval(timer) }, [])
  const values = [Math.floor(remaining / 86400000), Math.floor((remaining % 86400000) / 3600000), Math.floor((remaining % 3600000) / 60000), Math.floor((remaining % 60000) / 1000)]
  return <div className="countdown">{values.map((value, index) => <div key={index}><strong>{index === 0 ? value : String(value).padStart(2, '0')}</strong><span>{['Days', 'Hours', 'Minutes', 'Seconds'][index]}</span></div>)}</div>
}

function App() {
  const [opened, setOpened] = useState(false)
  const [opening, setOpening] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  useEffect(() => {
    if (!opened) return
    const sections = document.querySelectorAll<HTMLElement>('.site > section')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [opened])
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (musicOn) audio.play().catch(() => {})
    else audio.pause()
  }, [musicOn])
  const openInvitation = () => {
    if (opening || opened) return
    setOpening(true)
    setMusicOn(true)
    if (audioRef.current) {
      audioRef.current.currentTime = 58
      audioRef.current.play().catch(() => {})
    }
    window.setTimeout(() => setOpened(true), 1400)
  }
  return <>
    <audio ref={audioRef} src="/Under Your Wings (Official Lyric Video) – Grace Of Africa - Grace Of Africa.mp3" loop preload="auto" />
    <div className={`cover ${opening ? 'is-opening' : ''} ${opened ? 'is-open' : ''}`} aria-hidden={opened}>
      <div className="cover-glow" /><div className="envelope"><div className="envelope-flap" /><div className="envelope-card"><span>{wedding.couple.monogram}</span><p>With joy in our hearts</p><b>{wedding.couple.names}</b><small>{wedding.date}</small></div><div className="seal">M<span>S</span></div></div>
      <button className="open-button" onClick={openInvitation} disabled={opening || opened}><span>{opening ? 'Opening' : 'Tap to open'}</span><i>↗</i></button><p className="cover-note">Wedding celebration · Francistown, Botswana</p>
    </div>
    {opened && <main className="site">
      <nav className={`nav ${menuOpen ? 'menu-open' : ''}`}><a className="nav-mark" href="#home" onClick={() => setMenuOpen(false)}>{wedding.couple.monogram}</a><div className="nav-links"><a href="#invitation" onClick={() => setMenuOpen(false)}>Invitation</a><a href="#details" onClick={() => setMenuOpen(false)}>Details</a><a href="#story" onClick={() => setMenuOpen(false)}>Our story</a></div><button className={`music ${musicOn ? 'playing' : ''}`} onClick={() => setMusicOn(!musicOn)} aria-label={musicOn ? 'Mute music' : 'Unmute music'}>{musicOn ? '♫' : '♩'} <span>{musicOn ? 'Mute' : 'Unmute'}</span></button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}><span /><span /><span /></button></nav>
      <section className="hero-section" id="home"><div className="hero-copy"><p className="eyebrow">A new chapter begins</p><h1>{wedding.couple.first}<em>&</em>{wedding.couple.second}</h1><p className="hero-date">{wedding.date} <span>·</span> Francistown, Botswana</p></div><PhotoFrame className="hero-photo hero-art" src={weAreGettingMarriedImage} alt="We are getting married" fit="contain" /><div className="scroll-cue"><span /> Scroll to explore</div></section>
      <section className="invitation section" id="invitation"><div className="section-label">01 <span /> You are invited</div><div className="invitation-copy"><p className="eyebrow">To our dearest family and friends</p><h2>We are getting<br /><i>married.</i></h2><p className="large-copy">{wedding.invitation}</p><div className="scripture"><p>{wedding.scriptures[0].text}</p><span>{wedding.scriptures[0].reference}</span></div><div className="rule" /><p className="signature">{wedding.couple.names}</p><div className="family-line"><span>{wedding.families.bride}</span><b>under God</b><span>{wedding.families.groom}</span></div></div></section>
      <section className="countdown-section"><p className="eyebrow">Counting the days</p><h2>Until we say <i>“I do”</i></h2><Countdown /></section>
      <section className="faith-section"><p className="eyebrow">A blessing for the journey</p><div className="scripture"><p>{wedding.scriptures[1].text}</p><span>{wedding.scriptures[1].reference}</span></div></section>
      <section className="details section" id="details"><div className="section-label">02 <span /> The celebrations</div><div className="details-grid"><div><p className="eyebrow">Three days · one family</p><h2>A journey<br /><i>together.</i></h2><p className="body-copy">From the Magadi celebration to Kgoroso, we invite you to share in the traditions, prayers and joyful moments that bring our families together.</p><a className="text-link" href={wedding.venue.map} target="_blank" rel="noreferrer">Explore the wedding venue ↗</a></div><div className="programme"><p className="eyebrow">The programme</p>{wedding.events.map((event, index) => <div className="event" key={event.time}><time><span className="event-icon" aria-hidden="true">{['✦', '✧', '✦'][index]}</span>{event.time}</time><div><h3>{event.name}</h3><p>{event.detail}</p><small>{event.description}</small></div></div>)}</div></div></section>
      <section className="venue section"><div className="venue-photo"><PhotoFrame src={crestamarangGardensImage} alt="Cresta Marang Gardens venue" fit="cover" /><span className="photo-note">Cresta Marang Gardens</span></div><div className="venue-copy"><p className="eyebrow">The setting</p><h2>{wedding.venue.name}</h2><p className="body-copy">{wedding.venue.description}<br />{wedding.venue.address}</p><a className="outline-button" href={wedding.venue.map} target="_blank" rel="noreferrer"><span className="location-icon" aria-hidden="true">⌖</span> View location <span>↗</span></a></div></section>
      <section className="dress-code section"><div className="section-label">03 <span /> Guest colours</div><div className="dress-code-grid"><div><p className="eyebrow">A note for our guests</p><h2>Come dressed<br /><i>in celebration.</i></h2><p className="body-copy">{wedding.dressCode.attire}</p><p className="dress-note">{wedding.dressCode.note}</p></div><div className="palette"><p className="eyebrow">{wedding.dressCode.title}</p><div className="swatches">{wedding.dressCode.colors.map((color) => <div className="swatch" key={color.name}><span style={{ backgroundColor: color.value }} /><p>{color.name}</p></div>)}</div></div></div></section>
        <section className="story section" id="story"><div className="section-label">03 <span /> Our story</div><div className="story-grid"><div className="story-heading"><p className="eyebrow">It started with Shalom</p><h2>Two paths,<br /><i>one journey.</i></h2></div><div className="story-copy"><p>Some stories are written in grand gestures. Ours grew in the little moments: long walks, shared playlists, and the comfortable quiet of simply being together.</p><p>Now, surrounded by our favourite people, we are ready for the next beautiful chapter.</p><span className="story-initials">M <b>+</b> S</span></div></div><div className="gallery"><PhotoFrame src={maxwellImage} alt="Maxwell" /><PhotoFrame src={ringsImage} alt="Wedding rings" fit="contain" /><PhotoFrame src={shirleyImage} alt="Shirley" /></div></section>
      <footer><span>{wedding.couple.monogram}</span><p>Made with love for {wedding.date}</p><span>♡</span></footer>
    </main>}
  </>
}

export default App
