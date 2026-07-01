// ============================================
// src/services/api.ts
// Backend ke saath saari communication is file se hoti hai
// ============================================

import type { AnalysisResult, HistoryItem } from '../types';

// Backend ka base URL — .env se aa raha hai
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ============================================
// Helper: Backend ka snake_case response ko
// frontend ke camelCase format mein convert karta hai
// ============================================
function transformAnalysisResponse(raw: any): AnalysisResult {
  return {
    id: raw.id ?? raw._id ?? '',
    userName: raw.user_name ?? '',
    fileName: raw.file_name ?? '',
    overallScore: raw.overall_score ?? 0,
    grade: raw.grade ?? 'N/A',
    scoreBreakdown: {
      experienceScore: raw.score_breakdown?.experience_score ?? 0,
      skillsScore: raw.score_breakdown?.skills_score ?? 0,
      contentScore: raw.score_breakdown?.content_score ?? 0,
      atsScore: raw.score_breakdown?.ats_score ?? 0,
      educationScore: raw.score_breakdown?.education_score ?? 0,
    },
    features: {
      experience: {
        yearsOfExperience: raw.features?.experience?.years_of_experience ?? 0,
        bulletPointCount: raw.features?.experience?.bullet_point_count ?? 0,
        actionVerbCount: raw.features?.experience?.action_verb_count ?? 0,
        hasQuantifiedAchievements: raw.features?.experience?.has_quantified_achievements ?? false,
      },
      skills: {
        totalSkillsFound: raw.features?.skills?.total_skills_found ?? 0,
        technicalSkills: raw.features?.skills?.technical_skills ?? [],
        softSkills: raw.features?.skills?.soft_skills ?? [],
        skillCategories: raw.features?.skills?.skill_categories ?? {},
      },
      content: {
        wordCount: raw.features?.content?.word_count ?? 0,
        sentenceCount: raw.features?.content?.sentence_count ?? 0,
        averageSentenceLength: raw.features?.content?.average_sentence_length ?? 0,
        metricsCount: raw.features?.content?.metrics_count ?? 0,
      },
      ats: {
        hasContactInfo: raw.features?.ats?.has_contact_info ?? false,
        hasSummarySection: raw.features?.ats?.has_summary_section ?? false,
        hasEducationSection: raw.features?.ats?.has_education_section ?? false,
        hasSkillsSection: raw.features?.ats?.has_skills_section ?? false,
        keywordDensity: raw.features?.ats?.keyword_density ?? 0,
      },
    },
    entities: {
      companies: raw.entities?.companies ?? [],
      jobTitles: raw.entities?.job_titles ?? [],
      dates: raw.entities?.dates ?? [],
    },
    aiInsights: {
      strengths: raw.ai_insights?.strengths ?? [],
      weaknesses: raw.ai_insights?.weaknesses ?? [],
      recommendedRoles: raw.ai_insights?.recommended_roles ?? [],
      atsTips: raw.ai_insights?.ats_tips ?? [],
      projectSuggestions: raw.ai_insights?.project_suggestions ?? [],
      summary: raw.ai_insights?.summary ?? '',
      error: raw.ai_insights?.error,
    },
    jobMatchScore: raw.job_match_score,
    createdAt: raw.created_at ?? new Date().toISOString(),
  };
}

// ============================================
// Main function: Resume ko backend ko bhejna analysis ke liye
// ============================================
export async function analyzeResume(
  file: File,
  userName?: string,
  jobDescription?: string
): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append('file', file);
  if (userName) formData.append('user_name', userName);
  if (jobDescription) formData.append('job_description', jobDescription);

  const response = await fetch(`${API_BASE_URL}/resume/analyze`, {
    method: 'POST',
    body: formData,
    // Note: FormData ke saath Content-Type header manually mat lagao,
    // browser khud sahi boundary ke saath set kar dega
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Analysis failed with status ${response.status}`);
  }

  const data = await response.json();
  return transformAnalysisResponse(data);
}

// ============================================
// Resume history fetch karna (pehle ki analyses)
// ============================================
export async function getResumeHistory(limit: number = 10): Promise<HistoryItem[]> {
  const response = await fetch(`${API_BASE_URL}/resume/history?limit=${limit}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch history with status ${response.status}`);
  }

  const data = await response.json();
  return (data.items ?? []).map((item: any) => ({
    id: item.id ?? item._id ?? '',
    userName: item.user_name ?? '',
    fileName: item.file_name ?? '',
    overallScore: item.overall_score ?? 0,
    grade: item.grade ?? 'N/A',
    createdAt: item.created_at ?? '',
  }));
}

// ============================================
// Original uploaded file ka URL banana (download/preview ke liye)
// ============================================
export function getResumeFileUrl(fileId: string): string {
  return `${API_BASE_URL}/resume/file/${fileId}`;
}

// ============================================
// Backend health check (server up hai ya nahi check karne ke liye)
// ============================================
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}