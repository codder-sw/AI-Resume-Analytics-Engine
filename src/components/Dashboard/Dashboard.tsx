import { CheckCircle, XCircle, Briefcase, Zap, FolderOpen, Download, RefreshCw } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';
import { getResumeFileUrl } from '../../services/api';
import ScoreGauge from '../Charts/ScoreGauge';
import RadarChart from '../Charts/RadarChart';
import PieChart from '../Charts/PieChart';
import BarChart from '../Charts/BarChart';
import styles from './Dashboard.module.css';

function gradeColor(g: string) {
  if (g.startsWith('A')) return '#818cf8';
  if (g === 'B') return '#22d3ee';
  if (g === 'C') return '#4ade80';
  if (g === 'D') return '#facc15';
  return '#f87171';
}

export default function Dashboard() {
  const { analysisResult, resetAll } = useResume();
  if (!analysisResult) return null;

  const { overallScore, grade, userName, fileName, scoreBreakdown, features, entities, aiInsights, createdAt, id } = analysisResult;

  const BREAKDOWN = [
    { label: 'Experience', score: scoreBreakdown.experienceScore, color: '#818cf8' },
    { label: 'Skills', score: scoreBreakdown.skillsScore, color: '#22d3ee' },
    { label: 'Content', score: scoreBreakdown.contentScore, color: '#4ade80' },
    { label: 'ATS', score: scoreBreakdown.atsScore, color: '#facc15' },
    { label: 'Education', score: scoreBreakdown.educationScore, color: '#f87171' },
  ];

  const ATS_CHECKS = [
    { label: 'Contact Info', value: features.ats.hasContactInfo },
    { label: 'Summary Section', value: features.ats.hasSummarySection },
    { label: 'Education Section', value: features.ats.hasEducationSection },
    { label: 'Skills Section', value: features.ats.hasSkillsSection },
  ];

  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.heading}>{userName ? `${userName}'s Resume Analysis` : 'Resume Analysis'}</h1>
          <p className={styles.meta}>{fileName} · {new Date(createdAt).toLocaleDateString()}</p>
        </div>
        <div className={styles.topActions}>
          <a href={getResumeFileUrl(id)} download className={styles.downloadBtn}>
            <Download size={16} /> Download Resume
          </a>
          <button className={styles.newBtn} onClick={resetAll}>
            <RefreshCw size={16} /> New Analysis
          </button>
        </div>
      </div>

      {/* Score Header */}
      <div className={styles.scoreHeader}>
        <div className={styles.scoreBig}>
          <span className={styles.scoreNum}>{Math.round(overallScore)}</span>
          <span className={styles.scoreSlash}>/100</span>
        </div>
        <div className={styles.gradeBadge} style={{ color: gradeColor(grade), borderColor: gradeColor(grade) }}>{grade}</div>
        <p className={styles.scoreLabel}>Overall Resume Score</p>
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        <div className={styles.card}><h3 className={styles.cardTitle}>Score Gauge</h3><ScoreGauge score={overallScore} /></div>
        <div className={styles.card}><h3 className={styles.cardTitle}>Section Scores</h3><RadarChart breakdown={scoreBreakdown} /></div>
        <div className={styles.card}><h3 className={styles.cardTitle}>Skill Categories</h3><PieChart skillCategories={features.skills.skillCategories} /></div>
      </div>

      {/* Score Breakdown */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Score Breakdown</h3>
        <div className={styles.breakdownGrid}>
          {BREAKDOWN.map(item => (
            <div key={item.label} className={styles.breakdownItem}>
              <div className={styles.breakdownMeta}>
                <span>{item.label}</span>
                <span style={{ color: item.color, fontWeight: 700 }}>{Math.round(item.score)}</span>
              </div>
              <div className={styles.barBg}>
                <div className={styles.barFill} style={{ width: `${item.score}%`, background: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills + Bar Chart */}
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Skills Found ({features.skills.totalSkillsFound})</h3>
          {features.skills.technicalSkills.length > 0 && (
            <div className={styles.skillSection}>
              <h4 className={styles.skillSubtitle}>Technical Skills</h4>
              <div className={styles.tagWrap}>
                {features.skills.technicalSkills.slice(0, 25).map(s => (
                  <span key={s} className={styles.skillTag}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {features.skills.softSkills.length > 0 && (
            <div className={styles.skillSection}>
              <h4 className={styles.skillSubtitle}>Soft Skills</h4>
              <div className={styles.tagWrap}>
                {features.skills.softSkills.map(s => (
                  <span key={s} className={`${styles.skillTag} ${styles.softTag}`}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Keyword Frequency</h3>
          <BarChart skillCategories={features.skills.skillCategories} />
        </div>
      </div>

      {/* AI Insights */}
      {!aiInsights.error && (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🤖 AI Insights</h3>
          {aiInsights.summary && <p className={styles.summary}>{aiInsights.summary}</p>}
          <div className={styles.insightGrid}>
            <div className={styles.insightCard}>
              <h4 className={styles.insightTitle} style={{ color: '#4ade80' }}><CheckCircle size={15} /> Strengths</h4>
              <ul>{aiInsights.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div className={styles.insightCard}>
              <h4 className={styles.insightTitle} style={{ color: '#f87171' }}><XCircle size={15} /> Areas to Improve</h4>
              <ul>{aiInsights.weaknesses.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div className={styles.insightCard}>
              <h4 className={styles.insightTitle} style={{ color: '#818cf8' }}><Briefcase size={15} /> Recommended Roles</h4>
              <div className={styles.tagWrap}>{aiInsights.recommendedRoles.map((r, i) => <span key={i} className={styles.roleTag}>{r}</span>)}</div>
            </div>
            <div className={styles.insightCard}>
              <h4 className={styles.insightTitle} style={{ color: '#22d3ee' }}><Zap size={15} /> ATS Tips</h4>
              <ul>{aiInsights.atsTips.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
          </div>
          {aiInsights.projectSuggestions.length > 0 && (
            <div className={styles.insightCard} style={{ marginTop: 16 }}>
              <h4 className={styles.insightTitle} style={{ color: '#facc15' }}><FolderOpen size={15} /> Project Suggestions</h4>
              <ul>{aiInsights.projectSuggestions.map((p, i) => <li key={i}>{p}</li>)}</ul>
            </div>
          )}
        </div>
      )}

      {/* Entities */}
      {(entities.companies.length > 0 || entities.jobTitles.length > 0) && (
        <div className={styles.twoCol}>
          {entities.companies.length > 0 && (
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Companies Detected</h3>
              <div className={styles.tagWrap}>{entities.companies.map((c, i) => <span key={i} className={styles.entityTag}>{c}</span>)}</div>
            </div>
          )}
          {entities.jobTitles.length > 0 && (
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Job Titles Detected</h3>
              <div className={styles.tagWrap}>{entities.jobTitles.map((t, i) => <span key={i} className={styles.entityTag}>{t}</span>)}</div>
            </div>
          )}
        </div>
      )}

      {/* ATS Checklist */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>ATS Checklist</h3>
        <div className={styles.atsGrid}>
          {ATS_CHECKS.map(item => (
            <div key={item.label} className={styles.atsItem}>
              {item.value ? <CheckCircle size={18} color="#4ade80" /> : <XCircle size={18} color="#f87171" />}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}