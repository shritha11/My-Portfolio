import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import DevelopmentSection from './components/DevelopmentSection';
import HeroPhoto from './HeroPhoto';
import DesignSection from "./components/DesignSection";
import LogoMarquee from "./components/LogoMarquee";
import Collage from "./components/CollageComponent";

function EntryScreen({ onEnter }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="entry-overlay">
      <div className={`entry-box ${glitch ? 'glitch' : ''}`}>
        <div className="entry-top-bar">
          <span className="entry-dot red" />
          <span className="entry-dot yellow" />
          <span className="entry-dot green" />
          <span className="entry-title-bar">portfolio.exe</span>
        </div>
        <div className="entry-body">
          <p className="entry-warning">⚠ WARNING</p>
          <p className="entry-msg">you're about to see<br />some cool shit.</p>
          <p className="entry-sub">// designer who codes — proceed with curiosity</p>
          <div className="entry-btns">
            <button className="entry-btn-primary" onClick={onEnter}>[enter]</button>
            <button className="entry-btn-secondary" onClick={onEnter}>[nah I'm good]</button>
          </div>
        </div>
        <div className="entry-scanline" />
      </div>
    </div>
  );
}

const ASCII_CHARS = '@#S%?*+;:,. ';

function AsciiWebcam() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const asciiRef = useRef(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const animRef = useRef(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 80, height: 60 } });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setActive(true);
    } catch {
      setError(true);
    }
  }, []);

  const renderAscii = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) {
      animRef.current = requestAnimationFrame(renderAscii);
      return;
    }
    const W = 60, H = 30;
    const ctx = canvas.getContext('2d');
    canvas.width = W; canvas.height = H;
    ctx.drawImage(video, 0, 0, W, H);
    const data = ctx.getImageData(0, 0, W, H).data;
    let ascii = '';
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const bright = (data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114) / 255;
        ascii += ASCII_CHARS[Math.floor(bright * (ASCII_CHARS.length - 1))];
      }
      ascii += '\n';
    }
    if (asciiRef.current) asciiRef.current.textContent = ascii;
    animRef.current = requestAnimationFrame(renderAscii);
  }, []);

  useEffect(() => {
    if (active) {
      animRef.current = requestAnimationFrame(renderAscii);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [active, renderAscii]);

  if (error) return (
    <div className="ascii-fallback">
      <pre className="ascii-static">{STATIC_ASCII}</pre>
      <p className="ascii-label">// s.exe</p>
    </div>
  );

  return (
    <div className="ascii-wrap">
      <video ref={videoRef} style={{ display: 'none' }} muted playsInline />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {!active ? (
        <div className="ascii-prompt" onClick={startCamera}>
          <pre className="ascii-static">{STATIC_ASCII}</pre>
          <div className="ascii-overlay-btn">[ activate webcam ]</div>
        </div>
      ) : (
        <div className="ascii-live">
          <pre ref={asciiRef} className="ascii-output" />
          <p className="ascii-live-label">// live feed</p>
        </div>
      )}
    </div>
  );
}

const STATIC_ASCII = `
  ░░░░░░░░░░░░░░░░░░
░░  ╭──────────────╮  ░
░  │  ◉        ◉  │  ░
░  │      ▽       │  ░
░  │   ╰──────╯   │  ░
░░  ╰──────────────╯  ░
  ░░  ╭──────────╮  ░░
  ░░  │ SHRITHA  │  ░░
  ░░  ╰──────────╯  ░░
  ░  designer.exe   ░
  ░░░░░░░░░░░░░░░░░░`;

function Typewriter() {
  const phrases = [
    'making products people actually love.',
    'bridging gap between design & development.',
    'turning user problems into real solutions.',
  ];
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const phrase = phrases[idx];
    const timeout = setTimeout(() => {
      if (!del) {
        setText(phrase.slice(0, text.length + 1));
        if (text.length + 1 === phrase.length) setTimeout(() => setDel(true), 1800);
      } else {
        setText(phrase.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setIdx((idx + 1) % phrases.length); }
      }
    }, del ? 35 : 75);
    return () => clearTimeout(timeout);
  });

  return (
    <span className="typewriter-text">
      {text}<span className="cursor">|</span>
    </span>
  );
}

function Nav({ active }) {
  const links = ['Home', 'About', 'Projects', 'Contact'];
  return (
    <nav className="nav">
      <div className="nav-logo">S<span>/</span></div>
      <ul className="nav-links">
        {links.map(l => (
          <li key={l}>
            <a href={`#${l}`} className={active === l ? 'nav-active' : ''}>{l}</a>
          </li>
        ))}
      </ul>
      <a href="mailto:shrithagoud26@gmail.com" className="nav-cta">get in touch ↗</a>
    </nav>
  );
}

function Hero() {
  const [showText, setShowText] =
  useState(false);

useEffect(() => {

  const timer = setTimeout(() => {

    setShowText(true);

  }, 1500);

  return () => clearTimeout(timer);

}, []);
  return (
    <section id="home" className="hero">
      {showText && (
      <div className="hero-left">
        <span className="hero-tag">// DESIGNER WHO CODES</span>
        <h1 className="hero-title">Hi, I'm <span className="hero-name">Shritha.</span></h1>
        <p className="hero-sub"><Typewriter /></p>
        <div className="hero-btns">
          <a href="#projects" className="btn-primary">view work</a>
          <a href="#about" className="btn-ghost">about me</a>
        </div>
        <div className="hero-socials">
          {[
            { label: 'LinkedIn', url: 'https://linkedin.com' },
            { label: 'GitHub', url: 'https://github.com' },
            { label: 'Behance', url: 'https://behance.net' },
          ].map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="social-chip">
              <span className="social-dot" />{s.label}
            </a>
          ))}
        </div>
      </div>
      )}
      <div className="hero-right">

  <div className="anime-video-wrap">

    <video
      className="anime-video"
      src="/videos/anime.mp4"
      autoPlay
      muted
      loop
      playsInline
    />

    <div className="anime-overlay" />

  </div>

</div>
    </section>
  );
}

function Marquee() {
  const items = ['UI/UX DESIGN', 'REACT', 'FLUTTER', 'FIGMA', 'USER RESEARCH', 'PRODUCT THINKING', 'INTERACTION DESIGN', 'DART', 'FIREBASE', 'PROTOTYPING', 'HTML/CSS', 'PYTHON', 'SQL'];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">{item}<span className="marquee-sep">✦</span></span>
        ))}
      </div>
    </div>
  );
}

const PROJECTS = [
  {
    id: 1, cat: 'design', tag: 'UX DESIGN — CASE STUDY', name: 'Kaam',
    desc: 'Connecting skilled workers with real opportunities. Full empathy-driven design process.',
    color: '#c8ff00', preview: null,
  },
  {
    id: 2, cat: 'design', tag: 'UX DESIGN — CASE STUDY', name: 'Pawse',
    desc: 'A gentle mental health companion app designed for students battling social media addiction.',
    color: '#b794f4', preview: null,
  },
  {
    id: 3, cat: 'hybrid', tag: 'HYBRID — FIGMA + FLUTTER', name: 'CareTrack',
    desc: 'Healthcare case management app. Designed in Figma, built in Flutter with Provider architecture. Real SaaS product.',
    color: '#f6ad55', preview: null, featured: true,
  },
  {
    id: 4, cat: 'dev', tag: 'REACT — FULL STACK', name: 'ShopHub',
    desc: 'Ecommerce platform with AI chatbot, responsive mobile-first UI, product search and cart.',
    color: '#ff6b6b', preview: 'shophub',
  },
  {
    id: 5, cat: 'dev', tag: 'REACT — AI POWERED', name: 'CineMatch',
    desc: 'Movie finder with mood picker, AI stats, shared watch rooms, and free streaming search.',
    color: '#4ecdc4', preview: 'cinematch',
  },
  {
    id: 6, cat: 'hybrid', tag: 'HYBRID — REACT + FIGMA', name: 'College ERP',
    desc: 'Smart college portal — attendance predictor, OD optimizer, backlog tracker. Students deserve better tools.',
    color: '#c8ff00', preview: null,
  },
];

function ProjectCard({ proj, style }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`proj-card ${proj.featured ? 'proj-featured' : ''} ${hovered ? 'proj-hovered' : ''}`}
      style={{ ...style, '--accent': proj.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="proj-inner">
        <span className="proj-tag">{proj.tag}</span>
        <h3 className="proj-name">{proj.name}</h3>
        <p className="proj-desc">{proj.desc}</p>
        <div className="proj-footer">
          <span className="proj-arrow">↗</span>
          <div className="proj-color-dot" />
        </div>
      </div>
      {hovered && (
        <div className="proj-hover-overlay">
          <span className="proj-hover-text">view project</span>
        </div>
      )}
    </div>
  );
}

function ShopifyScroll({ projects }) {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      setOffset(progress);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={containerRef} className="shopify-scroll-grid">
      {projects.map((proj, i) => {
        const isCenter = i === 1;
        const translateY = isCenter
          ? offset * 60
          : -offset * 40;
        return (
          <ProjectCard
            key={proj.id}
            proj={proj}
            style={{ transform: `translateY(${translateY}px)`, transition: 'transform 0.1s linear' }}
          />
        );
      })}
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState('All');
  const tabs = ['All', 'Design', 'Development', 'Hybrid'];

  const filtered = PROJECTS.filter(p => filter === 'All' || p.cat === filter);
  const designProjs = PROJECTS.filter(p => p.cat === 'Design');
  const devProjs = PROJECTS.filter(p => p.cat === 'Development');
  const hybridProjs = PROJECTS.filter(p => p.cat === 'Hybrid');

  return (
    <section id="projects" className="section projects-section">
      <div className="section-header">
        <span className="section-label">// selected work</span>
        <h2 className="section-title">Projects</h2>
      </div>

      <div className="tab-row">
        {tabs.map(t => (
          <button
            key={t}
            className={`tab-btn ${filter === t ? 'tab-active' : ''}`}
            onClick={() => setFilter(t)}
          >{t}</button>
        ))}
      </div>

      {filter === 'All' && (
        <>
          <p className="projects-group-label">
           Design</p>

          <DesignSection />

          <p className="projects-group-label">
          Development</p>

         <DevelopmentSection />

          <p className="projects-group-label">Hybrid</p>
          <ShopifyScroll projects={hybridProjs} />
        </>
      )}
      
      {filter === 'Design' && (
       <DesignSection />
      )}

      {filter === 'Development' && (
       <DevelopmentSection />
    )}

      {filter === 'Hybrid' && (
       <div className="projects-grid-flat">
         {hybridProjs.map(proj => (
            <ProjectCard
              key={proj.id}
              proj={proj}
              style={{}}
          />
     ))}
     </div>
     )}

    </section>
  );
}

function About() {
  const skills = ['Figma', 'React', 'Flutter', 'Dart', 'JavaScript', 'HTML/CSS', 'Python', 'Firebase', 'MySQL', 'User Research', 'Wireframing', 'Prototyping'];

  return (
    <section id="about" className="section about-section">
      <div className="section-header">
        <span className="section-label">/* about me */</span>
        <h2 className="section-title">The Story</h2>
      </div>
      <div className="about-grid">
        <div className="about-text-col">
          <p className="about-text">
            I'm a final-year BSc CS student who <em>refused to choose</em> between design and code. I've always believed technology should make people's lives easier — not just work. So I learned both.
          </p>
          <p className="about-text">
            I design because I care about people. I code because I want to ship what I design. Currently building a real SaaS healthcare product as a Developer & Designer at Sthiram Services.
          </p>
        </div>
          <div className="skills-wrap">
            {skills.map(s => (
              <span key={s} className="skill-tag">{s}</span>
            ))}
          </div>
        </div>
    </section>
  );
}

function Footer() {
  const socials = [
    { label: 'LinkedIn', url: 'https://linkedin.com', color: '#0077b5' },
    { label: 'GitHub', url: 'https://github.com', color: '#fff' },
    { label: 'Behance', url: 'https://behance.net', color: '#1769ff' },
    { label: 'Resume', url: '#', color: '#c8ff00' },
  ];

  return (
    <footer id="contact" className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <h2 className="footer-heading">Let's build<br /><em>something real.</em></h2>
          <a href="mailto:shrithagoud26@gmail.com" className="footer-email">shrithagoud26@gmail.com ↗</a>
        </div>
        <div className="footer-right">
          <div className="footer-socials">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                style={{ '--hover-color': s.color }}
              >
                <span className="footer-social-arrow">↗</span>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Shritha — Designer who codes</span>
        <span className="footer-built">built in React ✦ designed in Figma</span>
      </div>
    </footer>
  );
}

function ExperienceSection() {
  return (
   <section className="experience-section">
  <div className="experience-container">

    <div className="experience-heading">
      <p>// SELECTED EXPERIENCE</p>
    </div>

    <div className="experience-list">

      <div className="experience-card">
        <span className="experience-year">2025 - Present</span>

        <h2>Sthiram Services LLP</h2>

        <h3>Software Developer Intern</h3>

        <p>
          Building frontend experiences, interactive UI systems,
          and internal tools with a focus on clean design and usability.
        </p>
      </div>

      <div className="experience-card">
        <span className="experience-year">2025</span>

        <h2>Internship Studio</h2>

        <h3>UI/UX Intern</h3>

        <p>
          Worked on user flows, wireframes, visual systems,
          and high-fidelity interfaces for product concepts.
        </p>
      </div>

    </div>
  </div>
</section>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => setVisible(true), 100);
  };

  return (
    <div className="app">
      {!entered && <EntryScreen onEnter={handleEnter} />}
      <div className={`main-content ${visible ? 'main-visible' : ''}`}>
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <ExperienceSection />
        <Collage />
        <LogoMarquee />
        <Footer />
      </div>
    </div>
  );
}