# ============================================
# app/services/ai_service.py
# Groq AI se career insights lena
# ============================================

import json
from groq import Groq
from app.config import settings

client = Groq(api_key=settings.ai_api_key)

SYSTEM_PROMPT = """You are an expert career coach and resume analyst.
Given resume text and extracted features, return ONLY a valid JSON object (no markdown, no extra text) with these exact keys:
{
  "strengths": ["..."],
  "weaknesses": ["..."],
  "recommended_roles": ["..."],
  "ats_tips": ["..."],
  "project_suggestions": ["..."],
  "summary": "2-3 sentence overall summary"
}
Keep each list to 3-5 items, be specific and actionable."""


async def get_ai_insights(resume_text: str, features: dict, job_description: str | None = None) -> dict:
    try:
        user_content = f"RESUME TEXT:\n{resume_text[:6000]}\n\nEXTRACTED FEATURES:\n{json.dumps(features)}"
        if job_description:
            user_content += f"\n\nJOB DESCRIPTION TO MATCH AGAINST:\n{job_description[:3000]}"

        response = client.chat.completions.create(
            model=settings.groq_model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_content},
            ],
            temperature=0.4,
            response_format={"type": "json_object"},
        )

        raw = response.choices[0].message.content
        parsed = json.loads(raw)

        return {
            "strengths": parsed.get("strengths", []),
            "weaknesses": parsed.get("weaknesses", []),
            "recommended_roles": parsed.get("recommended_roles", []),
            "ats_tips": parsed.get("ats_tips", []),
            "project_suggestions": parsed.get("project_suggestions", []),
            "summary": parsed.get("summary", ""),
            "error": None,
        }

    except Exception as e:
        # Graceful degradation — AI fail hone par bhi baaki analysis kaam kare
        return {
            "strengths": [],
            "weaknesses": [],
            "recommended_roles": [],
            "ats_tips": [],
            "project_suggestions": [],
            "summary": "",
            "error": f"AI insights generate nahi ho paaye: {str(e)}",
        }