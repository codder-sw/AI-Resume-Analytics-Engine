import styles from './LandingPage.module.css';

interface Props {
  onOpenDashboard: () => void;
}

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.42-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export default function LandingPage({ onOpenDashboard }: Props) {
  return (
    <div className={styles.page}>

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <div className={styles.logoIcon}>AI</div>
          <span>Resume Analytics</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#pipeline">Pipeline</a>
          <a href="#features">Features</a>
          <a href="#scoring">Scoring</a>
          <a href="#stack">Stack</a>
          <a href="https://github.com/codder-sw" target="_blank" rel="noopener">
            GitHub ↗
          </a>
        </div>
        <button className={styles.navCta} onClick={onOpenDashboard}>
          Open Dashboard →
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <span className={styles.badgeDot} />
          Live · Vercel + Render + MongoDB Atlas
        </div>
        <h1 className={styles.heroTitle}>
          Resume Intelligence<br />
          <span className={styles.heroGradient}>Powered by Real AI</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Upload any resume — PDF, DOCX, TXT, or image scan. Get real scores from OCR, spaCy NLP,
          and Groq AI. No mock data. No placeholders. Every number from your document.
        </p>
        <div className={styles.heroBtns}>
          <button className={styles.primaryBtn} onClick={onOpenDashboard}>
            Open Dashboard →
          </button>
          
          <a
            href="https://github.com/codder-sw"
            target="_blank"
            rel="noopener"
            className={styles.secondaryBtn}
          >
            <GithubIcon size={16} /> View Source
          </a>
        </div>
        <div className={styles.heroStats}>
          {STATS.map((s, i) => (
            <div key={i} className={styles.statGroup}>
              {i > 0 && <div className={styles.statDivider} />}
              <div className={styles.stat}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PIPELINE ── */}
      <section className={styles.section} id="pipeline">
        <div className={styles.sectionLabel}>• PIPELINE</div>
        <h2 className={styles.sectionTitle}>Six Stages. One Upload.</h2>
        <p className={styles.sectionSubtitle}>
          From raw bytes to structured insights — every stage runs sequentially on your document.
        </p>
        <div className={styles.pipelineGrid}>
          {PIPELINE_STAGES.map((stage, i) => (
            <div key={i} className={styles.pipelineCard}>
              <div className={styles.pipelineCardTop}>
                <div className={styles.pipelineIcon}>{stage.icon}</div>
                <span className={styles.pipelineNum}>0{i + 1}</span>
              </div>
              <h3 className={styles.pipelineCardTitle}>{stage.title}</h3>
              <p className={styles.pipelineCardDesc}>{stage.desc}</p>
              <div className={styles.tagRow}>
                {stage.tags.map((t, j) => <span key={j} className={styles.tag}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className={styles.section} id="features">
        <div className={styles.sectionLabel}>• CAPABILITIES</div>
        <h2 className={styles.sectionTitle}>What Makes It Different</h2>
        <p className={styles.sectionSubtitle}>
          Real signals from your document — not templates, not random numbers, not hardcoded examples.
        </p>
        <div className={styles.capGrid}>
          <div className={styles.capCard}>
            <div className={styles.capIcon}>🔬</div>
            <h3>Adaptive OCR Pipeline</h3>
            <p>
              OpenCV selects the best binarization strategy per image — adaptive Gaussian (uneven lighting)
              vs Otsu (clean scans) — whichever produces higher mean pixel value. Per-word confidence
              filtering at 60% threshold discards noise before NLP.
            </p>
            <div className={styles.tagRow}>
              {['OpenCV', 'Tesseract', 'pdf2image', '300 DPI', 'conf ≥ 60%'].map((t, i) => (
                <span key={i} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
          <div className={styles.capCard}>
            <div className={styles.capIcon}>📊</div>
            <h3>Deterministic Scoring Engine</h3>
            <p>Five independent scorers. Same document always produces the same score. No AI in the scoring loop.</p>
            <div className={styles.scoreBarList}>
              {SCORE_BARS.map((bar, i) => (
                <div key={i} className={styles.scoreBarRow}>
                  <span className={styles.scoreBarLabel}>{bar.label}</span>
                  <div className={styles.scoreBarBg}>
                    <div className={styles.scoreBarFill} style={{ width: `${bar.value}%`, background: bar.color }} />
                  </div>
                  <span className={styles.scoreBarVal}>{bar.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.featureGrid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={`${styles.featureCard} ${i === 3 ? styles.featureCardWide : ''}`}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className={styles.tagRow}>
                {f.tags.map((t, j) => <span key={j} className={styles.tag}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── OCR STEPS ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>• OCR DETAIL</div>
        <h2 className={styles.sectionTitle}>Image Preprocessing Steps</h2>
        <p className={styles.sectionSubtitle}>
          Every image and scanned PDF goes through this exact 7-step sequence — sourced from{' '}
          <code className={styles.code}>parser.py</code>.
        </p>
        <div className={styles.ocrGrid}>
          {OCR_STEPS.map((step, i) => (
            <div key={i} className={styles.ocrCardWrap}>
              <div className={styles.ocrCard}>
                <div className={styles.ocrIcon}>{step.icon}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
              {i < OCR_STEPS.length - 1 && <span className={styles.ocrArrow}>→</span>}
            </div>
          ))}
        </div>
        <div className={styles.ocrBadges}>
          <div className={styles.ocrBadge} style={{ borderColor: '#22c55e', color: '#22c55e' }}>
            🏷 OCR fallback threshold · &lt; 50 chars extracted → triggers full OCR pipeline
          </div>
          <div className={styles.ocrBadge} style={{ borderColor: '#a855f7', color: '#a855f7' }}>
            🎬 PDF render quality · 300 DPI via pdf2image + Poppler
          </div>
          <div className={styles.ocrBadge} style={{ borderColor: '#ef4444', color: '#ef4444' }}>
            🎯 Word confidence filter · ≥ 60% accepted · spatial grouping preserved
          </div>
        </div>
      </section>

      {/* ── SCORING MODEL ── */}
      <section className={styles.section} id="scoring">
        <div className={styles.sectionLabel}>• SCORING MODEL</div>
        <h2 className={styles.sectionTitle}>Every Point Is Earned</h2>
        <p className={styles.sectionSubtitle}>
          Five independent components. Weighted composite formula. No AI, no randomness, no hardcoded values.
        </p>
        <div className={styles.scoringGrid}>
          <div className={styles.scoringLeft}>
            {SCORING_COMPONENTS.map((c, i) => (
              <div key={i} className={styles.scoringRow}>
                <div className={styles.scoringMeta}>
                  <span className={styles.scoringDot} style={{ background: c.color }} />
                  <span className={styles.scoringName}>{c.name}</span>
                  <span className={styles.scoringPct} style={{ color: c.color }}>{c.pct}</span>
                </div>
                <div className={styles.scoringBarBg}>
                  <div className={styles.scoringBarFill} style={{ width: c.pct, background: c.color }} />
                </div>
              </div>
            ))}
            <div className={styles.taxonomyBox}>
              <div className={styles.taxonomyLabel}>SKILL TAXONOMY (6 CATEGORIES)</div>
              <div className={styles.tagRow}>
                {['programming', 'web', 'tools', 'database', 'cloud', 'data'].map((t, i) => (
                  <span key={i} className={styles.tag}>{t}</span>
                ))}
              </div>
              <p className={styles.taxonomyNote}>~90 technologies · word-boundary regex match</p>
            </div>
          </div>
          <div className={styles.scoringRight}>
            <div className={styles.formulaBox}>
              <div className={styles.formulaLabel}>COMPOSITE FORMULA</div>
              <pre className={styles.formula}>{`Overall = (0.30 × Experience)\n        + (0.25 × Skills)\n        + (0.20 × Content)\n        + (0.15 × ATS)\n        + (0.10 × Education)`}</pre>
            </div>
            <div className={styles.gradeBox}>
              <div className={styles.formulaLabel}>GRADE SCALE</div>
              <div className={styles.gradeRow}>
                {GRADES.map((g, i) => (
                  <div key={i} className={styles.gradeItem}>
                    <span className={styles.gradeLetter} style={{ color: g.color }}>{g.grade}</span>
                    <span className={styles.gradeRange}>{g.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className={styles.section} id="stack">
        <h2 className={styles.sectionTitle}>Built With Production Tools</h2>
        <p className={styles.sectionSubtitle}>
          Every dependency chosen deliberately — no abandoned packages, no unnecessary bloat.
        </p>
        <div className={styles.stackGrid}>
          {TECH_STACK.map((s, i) => (
            <div key={i} className={styles.stackCard}>
              <div className={styles.stackLabel}>{s.icon} {s.category}</div>
              <div className={styles.stackTags}>
                {s.items.map((item, j) => (
                  <span key={j} className={styles.stackTag}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <h2>Ready to analyse <span className={styles.heroGradient}>your resume?</span></h2>
        <p>Upload a PDF, DOCX, TXT, or image — real results in under 30 seconds.</p>
        <div className={styles.heroBtns}>
          <button className={styles.primaryBtn} onClick={onOpenDashboard}>
            Open Dashboard →
          </button>
          <a href="http://localhost:8000/docs" target="_blank" rel="noopener" className={styles.secondaryBtn}>
            View API Docs ↗
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <p>This project is made by <strong>Shivam Waghule</strong></p>
        <p className={styles.footerSub}>AI Resume Analytics Engine · Built with FastAPI, spaCy, Groq AI & React</p>
      </footer>
    </div>
  );
}

/* ── DATA CONSTANTS ── */
const STATS = [
  { num: '5', label: 'File formats' },
  { num: '90+', label: 'Skills tracked' },
  { num: '10+', label: 'AI output fields' },
  { num: '6', label: 'Pipeline stages' },
];

const PIPELINE_STAGES = [
  { icon: '📁', title: 'File Validation', desc: 'Extension whitelist (.pdf .docx .txt .png .jpg .jpeg), 10 MB size guard, and empty-file check — before any processing begins.', tags: ['Router layer · 415/413/400'] },
  { icon: '🔍', title: 'Text Extraction', desc: 'pdfplumber for native PDF text layers. Auto-falls back to Tesseract OCR (300 DPI, conf ≥ 60%) when extracted text is under 50 characters.', tags: ['pdfplumber', 'pdf2image', 'OpenCV'] },
  { icon: '🧠', title: 'NLP Enrichment', desc: 'spaCy en_core_web_sm extracts ORG entities (companies), DATE entities, and 2–6 word job title phrases. 40+ noise words filtered out.', tags: ['spaCy', 'NER', 'noun chunks'] },
  { icon: '📊', title: 'Feature Scoring', desc: 'Four independent regex-based extractors compute Experience, Skills (6 taxonomies), Content Quality, and ATS signals. Weighted composite score.', tags: ['Deterministic', 'No RNG', 'Always reproducible'] },
  { icon: '✨', title: 'Groq AI Insights', desc: 'Groq LLM generates 10 structured fields — career level, role recommendations, ATS tips, red flags, and unique insights.', tags: ['temperature=0.3', '2048 tokens'] },
  { icon: '💾', title: 'MongoDB Storage', desc: 'Structured analysis document saved to Atlas. Raw file stored in GridFS with original filename preserved. Non-blocking async — never delays response.', tags: ['Motor async', 'GridFS', '3 indexes'] },
];

const SCORE_BARS = [
  { label: 'Experience', value: 73, color: '#818cf8' },
  { label: 'Skills', value: 82, color: '#22d3ee' },
  { label: 'Content', value: 68, color: '#4ade80' },
  { label: 'ATS', value: 60, color: '#facc15' },
  { label: 'Education', value: 90, color: '#f87171' },
];

const FEATURES = [
  { icon: '🏢', title: 'NLP Entity Extraction', desc: 'spaCy ORG entities detect real employer names. DATE entities track employment periods. Noun-chunk analysis finds job title phrases (2–6 words). Noise filter removes 40+ false positives.', tags: ['spaCy', 'NER'] },
  { icon: '🤖', title: 'Groq AI Insights', desc: 'On-demand via Groq LLM. Returns career level, role matches, ATS tips, red flags, project suggestions. Fails gracefully — scoring always runs.', tags: ['llama-3.3-70b-versatile'] },
  { icon: '🗄️', title: 'GridFS File Storage', desc: 'Original file stored in MongoDB GridFS with the exact uploaded filename preserved. Binary split into 255 KB chunks. Download endpoint returns correct MIME type.', tags: ['GridFS', 'Motor'] },
  { icon: '📈', title: 'Interactive Dashboard', desc: 'ECharts score gauge, radar chart (section scores), donut chart (skill categories), and horizontal bar chart (keyword frequency) — all from real data. Dark/light mode, one-click file download.', tags: ['ECharts v6', 'React 18', 'Dark mode', 'Responsive'] },
  { icon: '🚀', title: 'Production Ready', desc: 'Clean FastAPI architecture with rate limiting, CORS, async database operations, and graceful error handling throughout the pipeline.', tags: ['FastAPI', 'Motor async', 'slowapi'] },
];

const OCR_STEPS = [
  { icon: '🖼️', title: 'PIL Image', desc: 'Any format → force RGB via .convert()' },
  { icon: '⬜', title: 'Grayscale', desc: 'cv2.COLOR_RGB2GRAY — single channel' },
  { icon: '🌀', title: 'Gaussian Blur', desc: 'kernel (3,3) — suppresses JPEG/scanner noise' },
  { icon: '📄', title: 'Adaptive Thresh', desc: 'GAUSSIAN_C, blockSize=15, C=8 — uneven lighting' },
  { icon: '🎯', title: 'Otsu Thresh', desc: 'THRESH_BINARY + THRESH_OTSU — clean images' },
  { icon: '✅', title: 'Best Selected', desc: 'Higher mean pixel value wins — more white = cleaner' },
  { icon: '📝', title: 'Tesseract OCR', desc: 'image_to_data, lang=eng, conf ≥ 60 kept' },
];

const SCORING_COMPONENTS = [
  { name: 'Experience', pct: '30%', color: '#818cf8' },
  { name: 'Skills', pct: '25%', color: '#22d3ee' },
  { name: 'Content Quality', pct: '20%', color: '#4ade80' },
  { name: 'ATS Compatibility', pct: '15%', color: '#facc15' },
  { name: 'Education', pct: '10%', color: '#f87171' },
];

const GRADES = [
  { grade: 'A+', range: '90–100', color: '#818cf8' },
  { grade: 'A', range: '80–89', color: '#22d3ee' },
  { grade: 'B', range: '70–79', color: '#4ade80' },
  { grade: 'C', range: '60–69', color: '#facc15' },
  { grade: 'D', range: '50–59', color: '#fb923c' },
  { grade: 'F', range: '0–49', color: '#f87171' },
];

const TECH_STACK = [
  { icon: '🎨', category: 'FRONTEND', items: ['React 18', 'TypeScript', 'Vite 5', 'Plain CSS', 'ECharts 6', 'Lucide React'] },
  { icon: '⚙️', category: 'BACKEND', items: ['Python 3.13', 'FastAPI', 'Uvicorn', 'pydantic-settings', 'slowapi'] },
  { icon: '🔍', category: 'PARSING & OCR', items: ['pdfplumber', 'pdf2image', 'OpenCV', 'Tesseract', 'Pillow', 'python-docx'] },
  { icon: '🚀', category: 'AI & NLP', items: ['spaCy', 'en_core_web_sm', 'groq', 'llama-3.3-70b-versatile'] },
  { icon: '🗄️', category: 'DATABASE', items: ['MongoDB Atlas', 'Motor async', 'GridFS', 'BSON'] },
  { icon: '🌐', category: 'DEPLOYMENT', items: ['Vercel', 'Render', 'Docker', 'GitHub Actions'] },
];