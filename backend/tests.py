from models import redis_storage


redis_storage.isAlive()
print(redis_storage.get('auth'))

