from fastapi import APIRouter, UploadFile, File, Form, Request, HTTPException
from fastapi.responses import StreamingResponse
from app.limiter import limiter
from app.services import parser, analyzer, nlp_service, ai_service, db_service

router = APIRouter(prefix="/resume", tags=["resume"])

MAX_FILE_SIZE = 10 * 1024 * 1024


@router.post("/analyze")
@limiter.limit("10/minute")
async def analyze_resume(
    request: Request,
    file: UploadFile = File(...),
    user_name: str = Form(""),
    job_description: str = Form(""),
):
    file_bytes = await file.read()

    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File 10MB se badi hai")

    try:
        text = parser.extract_text(file.filename, file_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"File parse nahi ho payi: {str(e)}")

    if len(text.strip()) < 20:
        raise HTTPException(status_code=400, detail="Resume se koi text nahi mila. Dusri file try karein.")

    analysis = analyzer.analyze_resume_text(text)
    entities = nlp_service.extract_entities(text)
    ai_insights = await ai_service.get_ai_insights(text, analysis["features"], job_description or None)

    result = {
        "user_name": user_name,
        "file_name": file.filename,
        "overall_score": analysis["overall_score"],
        "grade": analysis["grade"],
        "score_breakdown": analysis["score_breakdown"],
        "features": analysis["features"],
        "entities": entities,
        "ai_insights": ai_insights,
        "job_match_score": None,
    }

    try:
        file_id = await db_service.save_resume_file(file.filename, file_bytes)
        result["file_id"] = file_id
        saved_id = await db_service.save_analysis_result(result)
        result["id"] = saved_id
    except Exception as e:
        result["id"] = "unsaved"
        result["db_error"] = str(e)

    return result


@router.get("/history")
async def get_history():
    return await db_service.get_history()


@router.get("/file/{file_id}")
async def get_file(file_id: str):
    try:
        stream = await db_service.get_file_stream(file_id)
        return StreamingResponse(stream, media_type="application/octet-stream")
    except Exception:
        raise HTTPException(status_code=404, detail="File nahi mili")