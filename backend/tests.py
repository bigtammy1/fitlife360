from models import redis_storage, storage


redis_storage.isAlive()
print(redis_storage.get('auth'))

for value in storage.all().values():
    print(value)