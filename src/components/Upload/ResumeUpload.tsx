import { useRef, useState } from 'react';
import { Upload, User, FileText, X } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';
import styles from './ResumeUpload.module.css';

const ALLOWED = ['.pdf', '.docx', '.txt', '.png', '.jpg', '.jpeg'];

export default function ResumeUpload() {
  const { setSelectedFile, setUserName, userName, selectedFile, setCurrentStep, error } = useResume();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState('');

  function validate(file: File): boolean {
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED.includes(ext)) { setFileError(`Supported: ${ALLOWED.join(', ')}`); return false; }
    if (file.size > 10 * 1024 * 1024) { setFileError('Max size is 10 MB'); return false; }
    setFileError('');
    return true;
  }

  function handleFile(file: File) {
    if (validate(file)) setSelectedFile(file);
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Upload Your Resume</h2>
        <p className={styles.subtitle}>Real OCR · NLP · AI analysis — no mock data, no placeholders</p>

        <div className={styles.formGroup}>
          <label className={styles.label}><User size={14} /> Your Name</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter your name (optional)"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </div>

        <div
          className={`${styles.dropZone} ${dragOver ? styles.dragOver : ''} ${selectedFile ? styles.hasFile : ''}`}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onClick={() => !selectedFile && inputRef.current?.click()}
        >
          <input
            ref={inputRef} type="file"
            accept={ALLOWED.join(',')}
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
            style={{ display: 'none' }}
          />
          {selectedFile ? (
            <div className={styles.fileSelected}>
              <FileText size={32} color="#6366f1" />
              <div className={styles.fileInfo}>
                <p className={styles.fileName}>{selectedFile.name}</p>
                <p className={styles.fileSize}>{(selectedFile.size / 1024).toFixed(1)} KB</p>
              </div>
              <button className={styles.removeBtn} onClick={e => { e.stopPropagation(); setSelectedFile(null); }}>
                <X size={18} />
              </button>
            </div>
          ) : (
            <>
              <div className={styles.uploadIconBox}><Upload size={28} /></div>
              <p className={styles.dropTitle}>Drag & drop your resume</p>
              <p className={styles.dropSub}>or click anywhere to browse</p>
              <button className={styles.browseBtn} onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}>
                Browse Files
              </button>
              <p className={styles.formats}>PDF • DOCX • TXT • PNG • JPG &nbsp;|&nbsp; Max 10 MB</p>
            </>
          )}
        </div>

        {(fileError || error) && <p className={styles.error}>{fileError || error}</p>}

        <button className={styles.nextBtn} disabled={!selectedFile} onClick={() => selectedFile && setCurrentStep('job-match')}>
          Continue →
        </button>

        <div className={styles.featureCards}>
          {[
            { icon: '🧠', title: 'Real OCR + NLP', desc: 'Tesseract + spaCy extract entities from your actual document' },
            { icon: '🛡️', title: 'All Formats', desc: 'PDF, DOCX, TXT, PNG, JPG — even scanned images work' },
            { icon: '⚡', title: 'AI Feedback', desc: 'Groq AI generates career-level insights and role recommendations' },
          ].map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <span className={styles.fcIcon}>{f.icon}</span>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}