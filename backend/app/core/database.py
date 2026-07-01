from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from app.config import settings

client: AsyncIOMotorClient | None = None
database = None
gridfs_bucket: AsyncIOMotorGridFSBucket | None = None


def connect_to_mongo():
    global client, database, gridfs_bucket
    client = AsyncIOMotorClient(settings.mongodb_uri)
    database = client[settings.database_name]
    gridfs_bucket = AsyncIOMotorGridFSBucket(database, bucket_name="resume_files")
    print("✅ MongoDB connected")


def close_mongo_connection():
    global client
    if client:
        client.close()
        print("MongoDB connection closed")


def get_database():
    return database


def get_gridfs_bucket():
    return gridfs_bucket