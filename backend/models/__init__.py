from models.user import User
from models.instructor import Instructor
from models.classes import Class
from models.base import Base
from .engine.db_engine import DBStorage
from .engine.redis_engine import RedisEngine

storage = DBStorage()

storage.reload()
print('done')
redis_storage = RedisEngine()
print(f"Redis is alive: {redis_storage.isAlive()}")
