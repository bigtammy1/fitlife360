#!/usr/bin/env python3
# import models
# from models.user import User
# from models.user_profile import UserProfile

# user = User(name="Ade", gender='male', password='pass', phone='090888888', email='ade@gggggg.test')
# user.save()
# print(user.id)

# userp = UserProfile(age=77, weight=77, height=190, picture='ade', user_id=user.id)
# userp.save()
# user.user_profile=userp
# models.storage.save()

import os
import base64
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
load_dotenv()
upload_folder = os.getenv('UPLOAD_PATH')

# def save_base64_image(base64_data, user_id):
#     """Save a Base64 image to the server and return the file path"""
#     try:
#         os.makedirs(upload_folder, exist_ok=True)
#         # file_data = base64_data.split(',')[1]
#         file_name = base64_data.split(',')[0].split(':')[1].split(';')[0]
#         filename = secure_filename(f"profile_pic_{user_id}_{file_name}") 
#         final_path = os.path.join(upload_folder, filename)
#         with open(final_path, 'wb') as f:
#             f.write(base64.b64decode(base64_data))
#         return final_path
#     except Exception as e:
#         raise e

from utils import save_base64_image



picture = save_base64_image('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…DqPAzzHzDqMMnuEPmM8Qk7YzuhHaM/tTtjez7Z5Trnif/2Q==', 'abcd')
print(picture)