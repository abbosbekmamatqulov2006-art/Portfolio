import { useState, useEffect, useRef } from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'

/* ============================================================
   DATA — Edit this section to update your portfolio content
   ============================================================ */

const DATA = {
  name: "Abbosbek Mamatqulov",
  title: "Data Analyst & BI Analyst",
  subtitle: "Turning raw data into business decisions. Economics student at TUIT with hands-on experience in Python, SQL, Power BI, and Tableau.",
  email: "abbosbekmamatqulov2006@gmail.com",
  phone: "+998940873355",
  location: "Tashkent, Uzbekistan",
  github: "https://github.com/abbosbekmamatqulov2006-art/AbbosbekMamatqulov",
  linkedin: "https://www.linkedin.com/in/abbosbek-mamatqulov-06analyst",
  telegram: "https://t.me/abbosbek_Analyst",

  stats: [
    { num: "3+", label: "Internships" },
    { num: "10+", label: "Projects" },
    { num: "5+", label: "Certificates" },
    { num: "B2", label: "English Level" },
  ],

  about: `I'm a Data Analyst and BI Analyst in training, currently studying Economics at TUIT (2024–2028). I specialize in transforming complex datasets into clear, actionable insights using Python, SQL, and visualization tools like Power BI and Tableau. I've completed internships at RWS Workzone, EPAM Systems, Codveda, Elevvo, and RED Pharm, gaining real-world experience in ETL pipelines, dashboards, and econometric analysis.`,

  skills: [
    { name: "Python (Pandas, NumPy)", pct: 80 },
    { name: "SQL (PostgreSQL / MySQL / BigQuery)", pct: 85 },
    { name: "Power BI", pct: 78 },
    { name: "Tableau", pct: 72 },
    { name: "Excel / Google Sheets", pct: 90 },
    { name: "Git & GitHub", pct: 75 },
    { name: "ETL Pipelines", pct: 68 },
    { name: "Econometrics", pct: 70 },
  ],

  radarData: [
    { subject: "Python", A: 80 },
    { subject: "SQL", A: 85 },
    { subject: "Power BI", A: 78 },
    { subject: "Tableau", A: 72 },
    { subject: "Excel", A: 90 },
    { subject: "Statistics", A: 75 },
  ],

  experience: [
    {
      company: "RWS Workzone",
      role: "Data Analyst Intern",
      period: "Apr 2026 – Present",
      desc: "Working on data pipelines and dashboards for workflow automation projects. Responsible for ETL processes and reporting in Power BI.",
    },
    {
      company: "EPAM Systems (Trainee)",
      role: "Data Engineering Trainee",
      period: "Jan 2026 – Present",
      desc: "Training program at EPAM + Najot Ta'lim. Focus on SQL, Python for data engineering, and building production-grade pipelines.",
    },
    {
      company: "Codveda",
      role: "Data Analyst Intern",
      period: "2025",
      desc: "Developed analytical reports and interactive dashboards. Worked with large datasets using Python and SQL.",
    },
    {
      company: "RED Pharm",
      role: "Data Analyst Intern",
      period: "2025",
      desc: "Analyzed pharmaceutical sales data, created Excel and Power BI dashboards for management reporting.",
    },
    {
      company: "Elevvo",
      role: "BI Analyst Intern",
      period: "2025",
      desc: "Business intelligence tasks including KPI tracking, data visualization, and automated report generation.",
    },
  ],

  projects: [
    {
      icon: "💊",
      title: "Smart Pharmacy Point",
      desc: "Aqlli Dorixona — an AI-powered pharmacy startup. Built the pitch deck, MVP prototype in Figma, and GitHub repository. Submitted for President Tech Award.",
      tags: ["Python", "Figma", "AI", "Startup"],
      github: "https://github.com/abbosbekmamatqulov2006-art/AbbosbekMamatqulov",
      demo: "#",
    },
    {
      icon: "📈",
      title: "Inflation & Economic Growth in Uzbekistan",
      desc: "Thesis research analyzing the relationship between inflation rates and GDP growth in Uzbekistan using econometric models and real statistical data.",
      tags: ["Econometrics", "Python", "Statistics", "Research"],
      github: "https://github.com/abbosbekmamatqulov2006-art/AbbosbekMamatqulov",
      demo: "#",
    },
    {
      icon: "📊",
      title: "Sales Dashboard — Power BI",
      desc: "Interactive Power BI dashboard for retail sales analysis with filters by region, period, and product category. Includes KPI cards and trend lines.",
      tags: ["Power BI", "SQL", "DAX", "ETL"],
      github: "https://github.com/abbosbekmamatqulov2006-art/AbbosbekMamatqulov",
      demo: "#",
    },
    {
      icon: "🗄️",
      title: "BigQuery Data Pipeline",
      desc: "ETL pipeline connecting raw data sources to Google BigQuery for automated daily reports. Built with Python and scheduled via cron jobs.",
      tags: ["Python", "BigQuery", "ETL", "SQL"],
      github: "https://github.com/abbosbekmamatqulov2006-art/AbbosbekMamatqulov",
      demo: "#",
    },
    {
      icon: "🐍",
      title: "Python Data Analysis Toolkit",
      desc: "A collection of reusable Python scripts for common data analysis tasks — data cleaning, EDA, visualization templates, and SQLite integration.",
      tags: ["Python", "Pandas", "SQLite", "Visualization"],
      github: "https://github.com/abbosbekmamatqulov2006-art/AbbosbekMamatqulov",
      demo: "#",
    },
    {
      icon: "🎯",
      title: "SQL Practice & Portfolio",
      desc: "50+ SQL problems solved with step-by-step explanations using PostgreSQL. Covers subqueries, CTEs, window functions, and optimization.",
      tags: ["SQL", "PostgreSQL", "MySQL", "Analytics"],
      github: "https://github.com/abbosbekmamatqulov2006-art/AbbosbekMamatqulov",
      demo: "#",
    },
  ],

  // SERTIFIKATLAR — yangi qo'shish uchun quyidagi formatda yozing:
  // { icon: "🏅", title: "Nomi", issuer: "Kim bergan", date: "2025", image: "/portfolio/certs/fayl.png", verify: "https://..." },
  certificates: [
    {
      icon: "📊",
      title: "Data Analitika",
      issuer: "Najot Ta'lim",
      date: "Feb 2026",
      image: "/portfolio/certs/cert-najot-data.png",
    },
    {
      icon: "📋",
      title: "Data Analitika — Ilova",
      issuer: "Najot Ta'lim",
      date: "Feb 2026",
      image: "/portfolio/certs/cert-najot-ilova.png",
    },
    {
      icon: "🏆",
      title: "Certificate of Achievement — Data Analytics Internship",
      issuer: "Elevvo",
      date: "Mar 2026",
      image: "/portfolio/certs/cert-elevvo.png",
    },
    {
      icon: "🎓",
      title: "Data Analytics Bootcamp",
      issuer: "Codveda",
      date: "2025",
      image: "/portfolio/certs/cert-bootcamp.png",
    },
    {
      icon: "🌐",
      title: "Data Analyst Internship — Unstop Tech Fair 2025",
      issuer: "Geeks Kepler / Unstop",
      date: "2025",
      image: "/portfolio/certs/cert-unstop.png",
    },
    {
      icon: "🗄️",
      title: "Foundations for Big Data Analysis with SQL",
      issuer: "Cloudera / Coursera",
      date: "Nov 2025",
      image: "/portfolio/certs/cert-cloudera.png",
      verify: "https://coursera.org/verify/BXQBRR5WGQO4",
    },
    {
      icon: "⚙️",
      title: "APIs in Node.js: Write a RESTful API Backend Application",
      issuer: "Coursera",
      date: "Mar 2026",
      image: "/portfolio/certs/cert-nodejs.png",
      verify: "https://coursera.org/verify/4W64LTGU9PCC",
    },
  ],

  blog: [
    {
      icon: "📉",
      date: "May 2025",
      title: "How I analyzed Uzbekistan's inflation data with Python",
      excerpt: "A walkthrough of cleaning, visualizing, and modeling CPI and GDP data for my thesis using pandas and statsmodels.",
    },
    {
      icon: "🔍",
      date: "Apr 2025",
      title: "10 SQL window functions every analyst must know",
      excerpt: "Practical examples of ROW_NUMBER, LAG, LEAD, RANK, and NTILE with real datasets — from basics to advanced use cases.",
    },
    {
      icon: "📊",
      date: "Mar 2025",
      title: "Building my first Power BI dashboard from scratch",
      excerpt: "Step-by-step process of connecting data, writing DAX measures, and designing an executive sales dashboard.",
    },
  ],
}

/* ============================================================
   COMPONENTS
   ============================================================ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = ['About', 'Skills', 'Experience', 'Projects', 'Certificates', 'Blog', 'Contact']

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">AM_</a>
      <ul className={`nav-links${open ? ' open' : ''}`}>
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a>
          </li>
        ))}
      </ul>
      <button className="nav-menu-btn" onClick={() => setOpen(!open)}>☰</button>
    </nav>
  )
}

function HeroChart() {
  return (
    <svg className="hero-chart" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="200" r="160" stroke="#00e5ff" strokeWidth="0.5" strokeDasharray="4 8" />
      <circle cx="200" cy="200" r="120" stroke="#6c63ff" strokeWidth="0.5" strokeDasharray="4 8" />
      <circle cx="200" cy="200" r="80" stroke="#00e5ff" strokeWidth="0.5" strokeDasharray="4 8" />
      {[0,60,120,180,240,300].map((deg, i) => {
        const r = 160
        const x = 200 + r * Math.cos((deg - 90) * Math.PI / 180)
        const y = 200 + r * Math.sin((deg - 90) * Math.PI / 180)
        return <line key={i} x1="200" y1="200" x2={x} y2={y} stroke="#6c63ff" strokeWidth="0.5" opacity="0.5" />
      })}
      {[
        [200 + 160 * Math.cos(-30 * Math.PI / 180), 200 + 160 * Math.sin(-30 * Math.PI / 180)],
        [200 + 120 * Math.cos(30 * Math.PI / 180), 200 + 120 * Math.sin(30 * Math.PI / 180)],
        [200 + 140 * Math.cos(90 * Math.PI / 180), 200 + 140 * Math.sin(90 * Math.PI / 180)],
        [200 + 100 * Math.cos(150 * Math.PI / 180), 200 + 100 * Math.sin(150 * Math.PI / 180)],
        [200 + 130 * Math.cos(210 * Math.PI / 180), 200 + 130 * Math.sin(210 * Math.PI / 180)],
        [200 + 155 * Math.cos(270 * Math.PI / 180), 200 + 155 * Math.sin(270 * Math.PI / 180)],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#00e5ff" opacity="0.8" />
      ))}
      <polyline
        points="357,140 260,260 200,340 130,290 110,180 130,110"
        stroke="#00e5ff" strokeWidth="1.5" fill="none" opacity="0.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Hero() {
  const [count, setCount] = useState({ internships: 0, projects: 0, certs: 0 })
  const [typed, setTyped] = useState('')
  const titles = ['Data Analyst', 'BI Developer', 'SQL Engineer', 'Python Dev']
  const titleRef = useRef(0)
  const charRef = useRef(0)
  const dirRef = useRef(1)

  useEffect(() => {
    const interval = setInterval(() => {
      const current = titles[titleRef.current]
      if (dirRef.current === 1) {
        charRef.current++
        setTyped(current.slice(0, charRef.current))
        if (charRef.current >= current.length) {
          setTimeout(() => { dirRef.current = -1 }, 1800)
          clearInterval(interval)
          setTimeout(() => {
            const id = setInterval(() => {
              charRef.current--
              setTyped(current.slice(0, charRef.current))
              if (charRef.current <= 0) {
                clearInterval(id)
                titleRef.current = (titleRef.current + 1) % titles.length
                dirRef.current = 1
              }
            }, 60)
          }, 1800)
        }
      }
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="dot-grid" />
      <div className="blob" style={{ width: 500, height: 500, background: '#6c63ff', top: '-100px', right: '-100px' }} />
      <div className="blob" style={{ width: 400, height: 400, background: '#00e5ff', bottom: '-80px', left: '-80px' }} />
      <HeroChart />
      <div className="container hero-content fade-up">
        <p className="hero-eyebrow">// Hello, World! 👋</p>
        <h1 className="hero-title">
          <span>Abbosbek</span><br />
          <span className="gradient-text">Mamatqulov</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', color: '#7c8db5', marginBottom: '16px' }}>
          <span style={{ color: '#00e5ff' }}>{typed}</span>
          <span style={{ animation: 'blink 1s infinite', color: '#00e5ff' }}>|</span>
        </p>
        <p className="hero-subtitle">{DATA.subtitle}</p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a href="#contact" className="btn btn-primary">Get in touch →</a>
          <a href="#projects" className="btn btn-outline">View Projects</a>
        </div>
        <div className="hero-stats">
          {DATA.stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" style={{ background: 'var(--bg2)', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <p className="section-label">01. About Me</p>
        <h2 className="section-title">Who I Am</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.8, marginBottom: '24px' }}>{DATA.about}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['TUIT – Economics (2024–2028)', 'Najot Ta\'lim', 'Uzbek (Native)', 'English (B2)', 'Russian (A2)'].map(t => (
                <span className="tag cyan" key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { label: 'Location', value: DATA.location, icon: '📍' },
              { label: 'Education', value: 'TUIT 2024–2028', icon: '🎓' },
              { label: 'Status', value: 'Open to Work', icon: '✅' },
              { label: 'Focus', value: 'Data & BI Analysis', icon: '📊' },
            ].map((item, i) => (
              <div className="card" key={i} style={{ padding: '20px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#about .container > div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

function Skills() {
  const [animate, setAnimate] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimate(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        <p className="section-label">02. Skills</p>
        <h2 className="section-title">Technical <span className="gradient-text">Toolkit</span></h2>
        <div className="skills-grid">
          <div>
            {DATA.skills.map((s, i) => (
              <div className="skill-bar-item" key={i}>
                <div className="skill-bar-header">
                  <span className="skill-bar-name">{s.name}</span>
                  <span className="skill-bar-pct">{s.pct}%</span>
                </div>
                <div className="skill-bar-track">
                  <div className="skill-bar-fill" style={{ width: animate ? `${s.pct}%` : '0%' }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={DATA.radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#7c8db5', fontSize: 12, fontFamily: 'Space Mono' }} />
                <Radar name="Skills" dataKey="A" stroke="#00e5ff" fill="#00e5ff" fillOpacity={0.15} strokeWidth={2} />
                <Tooltip contentStyle={{ background: '#0c1428', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontFamily: 'Space Mono', fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" style={{ background: 'var(--bg2)', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <p className="section-label">03. Experience</p>
        <h2 className="section-title">Work <span className="gradient-text">History</span></h2>
        <div className="timeline">
          {DATA.experience.map((exp, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-dot" />
              <p className="timeline-period">{exp.period}</p>
              <h3 className="timeline-company">{exp.company}</h3>
              <p className="timeline-role">{exp.role}</p>
              <p className="timeline-desc">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        <p className="section-label">04. Projects</p>
        <h2 className="section-title">What I've <span className="gradient-text">Built</span></h2>
        <div className="projects-grid">
          {DATA.projects.map((p, i) => (
            <div className="project-card" key={i}>
              <div className="project-icon">{p.icon}</div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div style={{ marginBottom: '16px', display: 'flex', flexWrap: 'wrap' }}>
                {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>
              <div className="project-links">
                {p.github !== '#' && <a href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
                {p.demo !== '#' && <a href={p.demo} target="_blank" rel="noreferrer">Live Demo ↗</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Certificates() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="certificates" style={{ background: 'var(--bg2)', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <p className="section-label">05. Certificates</p>
        <h2 className="section-title">My <span className="gradient-text">Achievements</span></h2>
        <div className="certs-grid">
          {DATA.certificates.map((c, i) => (
            <div
              className="cert-card"
              key={i}
              onClick={() => setSelected(c)}
              style={{ cursor: 'pointer' }}
            >
              <div className="cert-icon">{c.icon}</div>
              <div>
                <p className="cert-title">{c.title}</p>
                <p className="cert-issuer">{c.issuer}</p>
                <p className="cert-date">{c.date}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyan)', marginTop: '6px' }}>
                  👁 Ko'rish uchun bosing
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg2)',
              borderRadius: '16px',
              border: '1px solid rgba(0,229,255,0.2)',
              padding: '24px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-head)', fontSize: '18px', fontWeight: 700 }}>{selected.title}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--cyan)' }}>{selected.issuer} · {selected.date}</p>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {selected.verify && (
                  <a href={selected.verify} target="_blank" rel="noreferrer"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--green)', textDecoration: 'none' }}>
                    ✅ Verify
                  </a>
                )}
                <button
                  onClick={() => setSelected(null)}
                  style={{ background: 'none', border: '1px solid var(--card-border)', color: 'var(--text)', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '13px' }}
                >
                  ✕ Yopish
                </button>
              </div>
            </div>
            {selected.image && (
              <img
                src={selected.image}
                alt={selected.title}
                style={{ width: '100%', borderRadius: '8px', display: 'block' }}
              />
            )}
          </div>
        </div>
      )}
    </section>
  )
}

function Blog() {
  return (
    <section id="blog" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        <p className="section-label">06. Blog</p>
        <h2 className="section-title">Latest <span className="gradient-text">Articles</span></h2>
        <div className="blog-grid">
          {DATA.blog.map((b, i) => (
            <div className="blog-card" key={i}>
              <div className="blog-img">{b.icon}</div>
              <div className="blog-body">
                <p className="blog-meta">{b.date}</p>
                <h3 className="blog-title">{b.title}</h3>
                <p className="blog-excerpt">{b.excerpt}</p>
                <a href="#" style={{ display: 'inline-block', marginTop: '16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--cyan)', textDecoration: 'none' }}>Read more →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Formspree yoki EmailJS bilan ulanish mumkin
    // https://formspree.io — bepul, GitHub Pages bilan ishlaydi
    const mailtoLink = `mailto:${DATA.email}?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.email)}`
    window.open(mailtoLink)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" style={{ background: 'var(--bg2)', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <p className="section-label">07. Contact</p>
        <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project or opportunity..." required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              {sent ? '✅ Sent!' : 'Send Message →'}
            </button>
          </form>

          <div>
            <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '32px', lineHeight: 1.8 }}>
              Open to freelance projects, internships, and full-time data roles. Feel free to reach out!
            </p>
            <div className="social-links">
              {[
                { icon: '💼', name: 'LinkedIn', handle: '/in/abbosbek-mamatqulov', url: DATA.linkedin },
                { icon: '🐙', name: 'GitHub', handle: '@abbosbek', url: DATA.github },
                { icon: '✈️', name: 'Telegram', handle: '@abbosbek', url: DATA.telegram },
                { icon: '📧', name: 'Email', handle: DATA.email, url: `mailto:${DATA.email}` },
              { icon: '📱', name: 'Phone', handle: DATA.phone, url: `tel:${DATA.phone}` },
              ].map((s, i) => (
                <a className="social-link" href={s.url} target="_blank" rel="noreferrer" key={i}>
                  <span className="social-link-icon">{s.icon}</span>
                  <div>
                    <p className="social-link-name">{s.name}</p>
                    <p className="social-link-handle">{s.handle}</p>
                  </div>
                  <span style={{ marginLeft: 'auto', color: 'var(--muted)' }}>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <p style={{ marginBottom: '8px' }}>
        Built with React + Vite · Hosted on GitHub Pages
      </p>
      <p>© {new Date().getFullYear()} Abbosbek Mamatqulov — All rights reserved</p>
    </footer>
  )
}

/* ============================================================
   APP ROOT
   ============================================================ */

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certificates />
      <Blog />
      <Contact />
      <Footer />
    </>
  )
}
