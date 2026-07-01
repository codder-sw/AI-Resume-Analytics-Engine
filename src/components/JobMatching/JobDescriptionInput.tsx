import { ArrowLeft } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';
import styles from './JobDescriptionInput.module.css';

export default function JobDescriptionInput() {
  const { jobDescription, setJobDescription, setCurrentStep, runAnalysis } = useResume();
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button className={styles.back} onClick={() => setCurrentStep('upload')}>
          <ArrowLeft size={16} /> Back
        </button>
        <h2 className={styles.title}>Job Description Match</h2>
        <p className={styles.subtitle}>
          Paste a job description to get a match score and targeted recommendations. This step is optional.
        </p>
        <textarea
          className={styles.textarea}
          placeholder="Paste the job description here (optional)..."
          value={jobDescription}
          onChange={e => setJobDescription(e.target.value)}
          rows={12}
        />
        <div className={styles.actions}>
          <button className={styles.skipBtn} onClick={runAnalysis}>Skip & Analyze</button>
          <button className={styles.analyzeBtn} onClick={runAnalysis}>Analyze with Job Match →</button>
        </div>
      </div>
    </div>
  );
}