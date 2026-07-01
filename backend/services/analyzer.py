# ============================================
# app/services/analyzer.py
# Regex-based features nikalna + score (0-100) calculate karna
# ============================================

import re

ACTION_VERBS = [
    "led", "built", "developed", "designed", "managed", "created", "implemented",
    "improved", "optimized", "launched", "achieved", "increased", "decreased",
    "reduced", "delivered", "coordinated", "spearheaded", "automated"
]

SKILLS_LIST = [
    "python", "java", "javascript", "typescript", "react", "node.js", "fastapi",
    "django", "flask", "sql", "mongodb", "postgresql", "aws", "docker", "kubernetes",
    "git", "html", "css", "machine learning", "deep learning", "nlp", "tensorflow",
    "pytorch", "pandas", "numpy", "excel", "tableau", "power bi", "communication",
    "leadership", "teamwork", "problem solving", "c++", "c#", "go", "rust",
    "spring boot", "vue", "angular", "graphql", "rest api", "ci/cd", "linux",
]

SECTION_KEYWORDS = {
    "summary": ["summary", "objective", "profile"],
    "education": ["education", "academic"],
    "skills": ["skills", "technical skills", "competencies"],
}


def extract_experience_features(text: str) -> dict:
    years_match = re.findall(r'(\d+)\+?\s*years?', text.lower())
    years = max([int(y) for y in years_match], default=0)

    bullet_count = len(re.findall(r'^[\s]*[•\-\*]', text, re.MULTILINE))
    action_verb_count = sum(text.lower().count(v) for v in ACTION_VERBS)
    has_metrics = bool(re.search(r'\d+%|\$\d+|\d+x\b', text))

    return {
        "years_of_experience": years,
        "bullet_point_count": bullet_count,
        "action_verb_count": action_verb_count,
        "has_quantified_achievements": has_metrics,
    }


def extract_skills_features(text: str) -> dict:
    text_lower = text.lower()
    found = [s for s in SKILLS_LIST if s in text_lower]

    technical = [s for s in found if s not in ("communication", "leadership", "teamwork", "problem solving")]
    soft = [s for s in found if s in ("communication", "leadership", "teamwork", "problem solving")]

    return {
        "total_skills_found": len(found),
        "technical_skills": technical,
        "soft_skills": soft,
        "skill_categories": {"technical": technical, "soft": soft},
    }


def extract_content_features(text: str) -> dict:
    words = text.split()
    sentences = re.split(r'[.!?]+', text)
    sentences = [s for s in sentences if s.strip()]
    avg_len = len(words) / len(sentences) if sentences else 0
    metrics_count = len(re.findall(r'\d+%|\$\d+|\d+x\b|\d+\+', text))

    return {
        "word_count": len(words),
        "sentence_count": len(sentences),
        "average_sentence_length": round(avg_len, 1),
        "metrics_count": metrics_count,
    }


def extract_ats_features(text: str) -> dict:
    text_lower = text.lower()
    has_email = bool(re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text))
    has_phone = bool(re.search(r'(\+?\d[\d\-\s]{8,}\d)', text))

    def has_section(keys):
        return any(k in text_lower for k in keys)

    word_count = len(text.split())
    skill_hits = sum(text_lower.count(s) for s in SKILLS_LIST)
    keyword_density = round((skill_hits / word_count) * 100, 2) if word_count else 0

    return {
        "has_contact_info": has_email or has_phone,
        "has_summary_section": has_section(SECTION_KEYWORDS["summary"]),
        "has_education_section": has_section(SECTION_KEYWORDS["education"]),
        "has_skills_section": has_section(SECTION_KEYWORDS["skills"]),
        "keyword_density": keyword_density,
    }


def calculate_score(features: dict) -> dict:
    exp = features["experience"]
    skills = features["skills"]
    content = features["content"]
    ats = features["ats"]

    experience_score = min(100, exp["years_of_experience"] * 10 + exp["action_verb_count"] * 2 + (20 if exp["has_quantified_achievements"] else 0))
    skills_score = min(100, skills["total_skills_found"] * 8)
    content_score = min(100, (content["word_count"] / 5) + content["metrics_count"] * 5)
    ats_score = (
        (25 if ats["has_contact_info"] else 0) +
        (25 if ats["has_summary_section"] else 0) +
        (25 if ats["has_education_section"] else 0) +
        (25 if ats["has_skills_section"] else 0)
    )
    education_score = 70 if ats["has_education_section"] else 30

    overall = round(
        experience_score * 0.30 +
        skills_score * 0.25 +
        content_score * 0.20 +
        ats_score * 0.15 +
        education_score * 0.10,
        1
    )

    if overall >= 90:
        grade = "A+"
    elif overall >= 80:
        grade = "A"
    elif overall >= 70:
        grade = "B"
    elif overall >= 60:
        grade = "C"
    elif overall >= 50:
        grade = "D"
    else:
        grade = "F"

    return {
        "overall_score": overall,
        "grade": grade,
        "score_breakdown": {
            "experience_score": round(experience_score, 1),
            "skills_score": round(skills_score, 1),
            "content_score": round(content_score, 1),
            "ats_score": round(ats_score, 1),
            "education_score": round(education_score, 1),
        }
    }


def analyze_resume_text(text: str) -> dict:
    features = {
        "experience": extract_experience_features(text),
        "skills": extract_skills_features(text),
        "content": extract_content_features(text),
        "ats": extract_ats_features(text),
    }
    score_data = calculate_score(features)
    return {"features": features, **score_data}