import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

const STAGES = [
  { icon: '📄', label: 'Parsing document', sub: 'Extracting text via OCR pipeline' },
  { icon: '🧠', label: 'Running NLP analysis', sub: 'Detecting entities with spaCy' },
  { icon: '📊', label: 'Calculating scores', sub: 'Experience · Skills · Content · ATS' },
  { icon: '🤖', label: 'Getting AI insights', sub: 'Groq LLM generating recommendations' },
  { icon: '💾', label: 'Saving to database', sub: 'MongoDB Atlas async write' },
];

export default function LoadingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveIndex(p => p < STAGES.length - 1 ? p + 1 : p), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.spinner} />
        <h2 className={styles.title}>Analyzing Your Resume</h2>
        <p className={styles.subtitle}>Running the full 6-stage AI pipeline...</p>
        <div className={styles.stages}>
          {STAGES.map((stage, i) => (
            <div key={i} className={`${styles.stage} ${i < activeIndex ? styles.done : ''} ${i === activeIndex ? styles.active : ''}`}>
              <div className={styles.stageIcon}>{i < activeIndex ? '✓' : stage.icon}</div>
              <div className={styles.stageText}>
                <span className={styles.stageLabel}>{stage.label}</span>
                <span className={styles.stageSub}>{stage.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}