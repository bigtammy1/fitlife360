from models.user import User
from models.trainer_profile import TrainerProfile
from models.user_profile import UserProfile
from models.classes import Class
from models.workout import WorkoutPlan
from models.exercise import Exercise
from models.base import Base
from .engine.db_engine import DBStorage
from .engine.redis_engine import RedisEngine
import os
storage = DBStorage()

storage.reload()
print('done')
redis_storage = RedisEngine()
print(f"Redis is alive: {redis_storage.isAlive()}")

path = os.getenv("UPLOAD")
home = os.path.expanduser("~")
dir_path = os.path.join(home, path)

# Check if the directory already exists
if not os.path.exists(dir_path):
    # If the directory doesn't exist, create it
    os.makedirs(dir_path)
    # Set permissions (read/write for owner, read for others)
    os.chmod(dir_path, 0o644)