import base64
from flask import request, abort
from models import redis_storage, storage
from models.user import User
from models.user_profile import UserProfile
from models.trainer_profile import TrainerProfile
from typing import Dict, Tuple, Union, BinaryIO
import os
from os import getenv
from uuid import uuid4
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename


member_expiration = int(getenv('USER_EXPIRATION'))
ins_expiration = int(getenv('INS_EXPIRATION'))
admin_expiration = int(getenv('ADMIN_EXPIRATION'))
upload_folder = getenv('UPLOAD_PATH')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def generate_token() -> str:
    """generate uuid token"""
    return str(uuid4())

def set_redis_key(user: User, token: str) -> Tuple[str, int]:
    """set user token expiration"""
    if user.role == 'trainer':
        key = f'trainer_{token}'
        expiration = member_expiration
    elif user.role == 'member':
        key = f'member_{token}'
        expiration = ins_expiration
    else:
        key = f'admin_{token}'
        expiration = admin_expiration
    return key, expiration

def get_id_by_token() -> str:
    """get id from header token
    Return: id of the trainer or user
    """
    token = request.headers.get('Authorization')
    if not token:
        abort(401, description='Missing token')
    id = redis_storage.get(token)
    if not id:
        raise KeyError('Key could not be found')
    return id

# save image to the server
def save_image(file: FileStorage, user_id: Union[str, int]) -> str:
    """Save an image to the server and return the file path
    
    Args:
        file (FileStorage): The image file
        user_id (Union[str, int]): The ID of the user to whom the image belongs
    
    Returns:
        str: The file path of the saved image
    """
    try:
        os.makedirs(upload_folder, exist_ok=True)
        file_ext = file.filename.split('.')[1]
        if file_ext not in ALLOWED_EXTENSIONS:
            raise ValueError('Invalid file extension')
        file_name = f"profile_pic_{user_id}_{uuid4().hex}.{file_ext}"
        filename = secure_filename(file_name) 
        final_path = os.path.join(upload_folder, filename)
        file.save(final_path)
        return final_path
    except Exception as e:
        raise e
    
def get_user_image(cls: Union[User, UserProfile, TrainerProfile], id: str) -> Dict:
    """get user and add their image to it
    Args:
        cls (User | UserProfile | TrainerProfile): The Pydantic model
        class for the user
        id (str): The ID of the user
    Returns:
        Dict: A dictionary containing the user data and their picture
    """
    user = storage.get(cls, id)
    if not user:
        raise ValueError(status_code=404, detail='User not found')
    pic = user.picture
    if not pic:
        raise ValueError('User has no picture')
    # Convert pic from link to file in filepath
    with open(pic, 'rb') as f:
        file_data = f.read()
    user.picture = file_data
    return user.to_dict()




def get_user_with_pic(cls: Union[User, UserProfile, TrainerProfile],
                      id: str) -> Dict:
    """Get a user with their picture
    
    Args:
        cls (User | UserProfile | TrainerProfile): The Pydantic model
        class for the user
        id (str): The ID of the user
    
    Returns:
        Dict: A dictionary containing the user data and their picture
    """
    user = storage.get(cls, id)
    if not user:
        raise ValueError(status_code=404, detail='User not found')
    pic = user.picture
    if not pic:
        raise ValueError('User has no picture')
    # Convert pic from link to file in filepath
    try:
        with open(pic, 'rb') as f:
            file_data = f.read()
        file_base64 = base64.b64encode(file_data).decode('utf-8')
        user_dict = user.to_dict()
        user_dict['picture'] = file_base64
        return user_dict
    except FileNotFoundError:
        pass    

def save_base64_image(base64_data: str, user_id: Union[str, int]) -> str:
    """Save a Base64 image to the server and return the file path
    
    Args:
        base64_data (str): The Base64 encoded image data
        user_id (Union[str, int]): The ID of the user to whom the image belongs
    
    Returns:
        str: The file path of the saved image
    """
    try:
        os.makedirs(upload_folder, exist_ok=True)
        if not base64_data.startswith('data:image'):
            raise ValueError('Invalid Base64 data')
        file_data = base64_data.split(',')[1]
        file_ext = base64_data.split(';')[0].split('/')[1]
        if file_ext not in ALLOWED_EXTENSIONS:
            raise ValueError('Invalid file extension')
        file_name = f"profile_pic_{user_id}_{uuid4().hex}.{file_ext}"
        filename = secure_filename(file_name) 
        final_path = os.path.join(upload_folder, filename)
        with open(final_path, 'wb') as f:
            f.write(base64.b64decode(file_data.encode('utf-8')))
        return final_path
    except Exception as e:
        raise e
