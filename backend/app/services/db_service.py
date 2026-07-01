import io
from datetime import datetime
from bson import ObjectId
from app.core.database import get_database, get_gridfs_bucket


async def save_resume_file(filename: str, file_bytes: bytes) -> str:
    bucket = get_gridfs_bucket()
    file_id = await bucket.upload_from_stream(filename, io.BytesIO(file_bytes))
    return str(file_id)


async def save_analysis_result(result: dict) -> str:
    db = get_database()
    result["created_at"] = datetime.utcnow().isoformat()
    insert_result = await db.resumes.insert_one(result)
    return str(insert_result.inserted_id)


async def get_history(limit: int = 20) -> list[dict]:
    db = get_database()
    cursor = db.resumes.find().sort("created_at", -1).limit(limit)
    items = []
    async for doc in cursor:
        items.append({
            "id": str(doc["_id"]),
            "user_name": doc.get("user_name", ""),
            "file_name": doc.get("file_name", ""),
            "overall_score": doc.get("overall_score", 0),
            "grade": doc.get("grade", ""),
            "created_at": doc.get("created_at", ""),
        })
    return items


async def get_file_stream(file_id: str):
    bucket = get_gridfs_bucket()
    return await bucket.open_download_stream(ObjectId(file_id))