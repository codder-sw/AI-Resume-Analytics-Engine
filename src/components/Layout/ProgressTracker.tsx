import { Check } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';
import styles from './ProgressTracker.module.css';

const STEPS = [
  { key: 'upload', label: 'Upload', sub: 'Choose your resume' },
  { key: 'job-match', label: 'Job Match', sub: 'Optional targeting' },
  { key: 'analyzing', label: 'Analysing', sub: 'OCR + NLP + AI processing' },
  { key: 'results', label: 'Results', sub: 'Insights & recommendations' },
];

export default function ProgressTracker() {
  const { currentStep } = useResume();
  const currentIndex = STEPS.findIndex(s => s.key === currentStep);

  return (
    <div className={styles.tracker}>
      {STEPS.map((step, index) => {
        const isDone = index < currentIndex;
        const isActive = index === currentIndex;
        return (
          <div key={step.key} className={styles.stepWrapper}>
            <div className={`${styles.circle} ${isActive ? styles.active : ''} ${isDone ? styles.done : ''}`}>
              {isDone ? <Check size={14} /> : <div className={isActive ? styles.innerDot : styles.emptyDot} />}
            </div>
            <div className={styles.stepText}>
              <span className={`${styles.label} ${isActive ? styles.activeLabel : ''}`}>{step.label}</span>
              <span className={styles.sub}>{step.sub}</span>
            </div>
            {index < STEPS.length - 1 && (
              <div className={`${styles.line} ${isDone ? styles.lineDone : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}