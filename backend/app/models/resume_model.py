from pydantic import BaseModel
from typing import Optional


class ScoreBreakdown(BaseModel):
    experience_score: float = 0
    skills_score: float = 0
    content_score: float = 0
    ats_score: float = 0
    education_score: float = 0


class ExperienceFeatures(BaseModel):
    years_of_experience: float = 0
    bullet_point_count: int = 0
    action_verb_count: int = 0
    has_quantified_achievements: bool = False


class SkillsFeatures(BaseModel):
    total_skills_found: int = 0
    technical_skills: list[str] = []
    soft_skills: list[str] = []
    skill_categories: dict[str, list[str]] = {}


class ContentFeatures(BaseModel):
    word_count: int = 0
    sentence_count: int = 0
    average_sentence_length: float = 0
    metrics_count: int = 0


class ATSFeatures(BaseModel):
    has_contact_info: bool = False
    has_summary_section: bool = False
    has_education_section: bool = False
    has_skills_section: bool = False
    keyword_density: float = 0


class FeatureBreakdown(BaseModel):
    experience: ExperienceFeatures
    skills: SkillsFeatures
    content: ContentFeatures
    ats: ATSFeatures


class NLPEntities(BaseModel):
    companies: list[str] = []
    job_titles: list[str] = []
    dates: list[str] = []


class AIInsights(BaseModel):
    strengths: list[str] = []
    weaknesses: list[str] = []
    recommended_roles: list[str] = []
    ats_tips: list[str] = []
    project_suggestions: list[str] = []
    summary: str = ""
    error: Optional[str] = None


class AnalysisResult(BaseModel):
    id: str
    user_name: Optional[str] = ""
    file_name: str
    overall_score: float
    grade: str
    score_breakdown: ScoreBreakdown
    features: FeatureBreakdown
    entities: NLPEntities
    ai_insights: AIInsights
    job_match_score: Optional[float] = None
    created_at: str