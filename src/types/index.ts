// ============================================
// src/types/index.ts
// Yahan hum saare TypeScript types/interfaces define karte hain
// jo poore app mein data ka "shape" batate hain
// ============================================

// App ke 4 steps — kaunsa screen abhi dikhana hai
export type AppStep = 'upload' | 'job-match' | 'analyzing' | 'results';

// ---------- Feature Breakdown (Experience, Skills, Content, ATS) ----------

export interface ExperienceFeatures {
  yearsOfExperience: number;
  bulletPointCount: number;
  actionVerbCount: number;
  hasQuantifiedAchievements: boolean;
}

export interface SkillsFeatures {
  totalSkillsFound: number;
  technicalSkills: string[];
  softSkills: string[];
  skillCategories: Record<string, string[]>;
}

export interface ContentFeatures {
  wordCount: number;
  sentenceCount: number;
  averageSentenceLength: number;
  metricsCount: number; // numbers/percentages found in text
}

export interface ATSFeatures {
  hasContactInfo: boolean;
  hasSummarySection: boolean;
  hasEducationSection: boolean;
  hasSkillsSection: boolean;
  keywordDensity: number;
}

export interface FeatureBreakdown {
  experience: ExperienceFeatures;
  skills: SkillsFeatures;
  content: ContentFeatures;
  ats: ATSFeatures;
}

// ---------- Score Breakdown ----------

export interface ScoreBreakdown {
  experienceScore: number;
  skillsScore: number;
  contentScore: number;
  atsScore: number;
  educationScore: number;
}

// ---------- NLP Extracted Entities ----------

export interface ExtractedEntity {
  text: string;
  label: string; // e.g. "ORG", "DATE", "PERSON"
}

export interface NLPEntities {
  companies: string[];
  jobTitles: string[];
  dates: string[];
}

// ---------- AI (Groq) Insights ----------

export interface AIInsights {
  strengths: string[];
  weaknesses: string[];
  recommendedRoles: string[];
  atsTips: string[];
  projectSuggestions: string[];
  summary: string;
  error?: string; // agar AI call fail ho jaye, error yahan store hoga
}

// ---------- Final Complete Analysis Result ----------

export interface AnalysisResult {
  id: string;
  userName: string;
  fileName: string;
  overallScore: number;
  grade: string; // "A+", "B", "C", etc.
  scoreBreakdown: ScoreBreakdown;
  features: FeatureBreakdown;
  entities: NLPEntities;
  aiInsights: AIInsights;
  jobMatchScore?: number; // agar job description diya gaya tha
  createdAt: string;
}

// ---------- API Request/Response Helper Types ----------

export interface AnalyzeRequestPayload {
  file: File;
  userName?: string;
  jobDescription?: string;
}

export interface HistoryItem {
  id: string;
  userName: string;
  fileName: string;
  overallScore: number;
  grade: string;
  createdAt: string;
}