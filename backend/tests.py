from models import storage as dbstorage
from models.base import BaseModel
from models.classes import Class
from models.instructor import Instructor


instructor = Instructor(email="papajohn@mail.com", phone="+2346035436678", password="pwd")
dbstorage.new(instructor)
classss = Class(name="Yoga", instructor_id=instructor.id, date_and_time="2020-12-12 12:00:00")
dbstorage.new(classss)
dbstorage.save()
print(dbstorage.get(Instructor, instructor.id))

print("all models")
print(dbstorage.all())
