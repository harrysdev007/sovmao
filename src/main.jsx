import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const media = '/media/';
const memories = [
  { file: 'dacha.png', title: 'Off duty. Still a comrade.', tag: '01 / THE DACHA', story: 'The five year plan can wait. This is his favorite song.' },
  { file: 'mountains.png', title: 'Seize the quiet.', tag: '02 / THE MOUNTAINS', story: 'A small cat. A very big world. Absolutely nothing on his mind.' },
  { file: 'window.png', title: 'Waiting for you, comrade.', tag: '03 / BACK HOME', story: 'The kettle is on. There is always room for one more paw.' },
  { file: 'red-square.png', title: 'Reporting for cuteness.', tag: '04 / RED SQUARE', story: 'He does not understand politics. He just likes saying hello.' },
  { file: 'winter.png', title: 'A warm heart. A cold post.', tag: '05 / WINTER WATCH', story: 'Snow on his hat. Not a single thought behind those eyes.' },
  { file: 'painting.png', title: 'A very small revolution.', tag: '06 / THE PEOPLE’S PORTRAIT', story: 'Some belong in history books. He belongs on your camera roll.' },
];
function Star({ className = '' }) { return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 1.5 3.1 6.7 7.4.8-5.5 5 1.5 7.3L12 17.6l-6.5 3.7L7 14 1.5 9l7.4-.8z" /></svg>; }
function Arrow({down=false}) {return <span aria-hidden="true">{down ? '↓' : '↗'}</span>}

function App() {
  const [selected, setSelected] = useState(null);
  const [more, setMore] = useState(false);
  const [salutes, setSalutes] = useState(() => { try { return Number(localStorage.getItem('sovmao-salutes')) || 0; } catch {return 0;} });
  const [saluting, setSaluting] = useState(false);
  const [muted, setMuted] = useState(true);
  const video = useRef(null);
  const gallery = useRef(null);
  const dialog = useRef(null);
  const timeout = useRef(null);
  useEffect(() => () => clearTimeout(timeout.current), []);
  useEffect(() => { if (selected) dialog.current?.showModal(); }, [selected]);
  function openGallery() {
    gallery.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    gallery.current?.focus({ preventScroll: true });
  }
  function salute() {
    const next = salutes + 1; setSalutes(next); setSaluting(true);
    try { localStorage.setItem('sovmao-salutes', String(next)); } catch {}
    clearTimeout(timeout.current); timeout.current = setTimeout(() => setSaluting(false), 1500);
  }
  return <>
    <button className="skip" onClick={openGallery}>Skip to the memes</button>
    <main>
      <section className="hero video-hero" id="home" aria-labelledby="hero-title">
        <video ref={video} className="hero-video" src={media+'hero.mp4?v=2'} autoPlay loop muted={muted} playsInline preload="auto" aria-label="SOVMAO video on the main screen" />
        <div className="video-shade"/>
        <button className="video-sound" onClick={()=>setMuted(!muted)} aria-label={muted?'Enable video sound':'Mute video sound'} aria-pressed={!muted}>{muted?'Sound off':'Sound on'} <span aria-hidden="true">{muted?'◌':'♪'}</span></button>
        <a className="x-community" href="https://x.com/sovmao_sol" target="_blank" rel="noopener noreferrer" aria-label="X (opens in a new tab)">X</a>
        <div className="hero-top"><span><i/> A LITTLE LESS SERIOUS. A LITTLE MORE SOVMAO.</span><span>EST. IN THE COLLECTIVE IMAGINATION</span></div>
        <h1 id="hero-title">SOVMAO<span className="sr-only">, the people's cat</span></h1>
        <div className="hero-copy"><p className="eyebrow">THE PEOPLE’S CAT</p><h2>One small cat.<br/>One collective paw.</h2><p>He has no grand plan.<br/>Just a tiny salute for everyone.</p><button className="cream-button" onClick={openGallery}>Meet the comrades <Arrow down/></button></div>
        <button onClick={salute} className={'salute-stamp '+(saluting?'stamped':'')} aria-label="Give SOVMAO a salute"><span>APPROVED BY</span><Star/><strong>the collective</strong><span>100% GOOD COMRADE</span></button>
        <div className="hero-note"><span className="note-line"/><p>No thoughts.<br/>Just solidarity.</p><span className="little-star">✦</span></div>
        <div className="hero-bottom"><span>BIG MUSTACHE. BIGGER HEART.</span><button onClick={openGallery}>SCROLL FOR THE GOOD STUFF <Arrow down/></button><span>01 / A PAW FOR THE PEOPLE</span></div>
      </section>
      <section ref={gallery} tabIndex={-1} className="gallery" id="memes" aria-labelledby="gallery-title">
        <div className="section-top"><span className="eyebrow">FROM THE COLLECTIVE CAMERA ROLL</span><span className="archive-label">ARCHIVE № 001</span></div>
        <div className="gallery-title"><h2 id="gallery-title">Memes of the people<span>✦</span></h2><p>Small moments. Shared equally.<br/>Tap a memory. Stay a little.</p></div>
        <div className="meme-grid">{memories.slice(0,more?6:3).map((m,i)=><article className={'meme-card card-'+i} key={m.file}>
          <button className="meme-image" onClick={()=>setSelected(m)} aria-label={'Open '+m.title}><img src={media+m.file} alt={m.title} loading="lazy"/><span className="open-meme"><Arrow/></span><span className="image-caption">SOVMAO / COLLECTIVE ARCHIVE</span></button>
          <div className="card-label"><span>{m.tag}</span><Star/></div><h3>{m.title}</h3>
        </article>)}</div>
        <button className="outline-button" onClick={()=>setMore(!more)} aria-expanded={more}>{more?'A little less':'More from the republic'} <span aria-hidden="true">{more?'−':'+'}</span></button>
      </section>
    </main>
    <div className={'toast '+(saluting?'visible':'')} role="status">★ Salute received, comrade.</div>
    <dialog ref={dialog} className="lightbox" onClick={e=>{if(e.target===dialog.current)dialog.current.close();}} onClose={()=>setSelected(null)}>
      {selected&&<><button className="close-modal" onClick={()=>dialog.current.close()} aria-label="Close image">×</button><img src={media+selected.file} alt={selected.title}/><div className="modal-copy"><span className="eyebrow">{selected.tag}</span><h2>{selected.title}</h2><p>{selected.story}</p><a href={media+selected.file} download={'SOVMAO-'+selected.file}>Keep this memory ↓</a></div></>}
    </dialog>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
