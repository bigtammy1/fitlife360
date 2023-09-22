from flask import request, abort
from models import redis_storage, storage
from models.user import User
from typing import Dict, Tuple
import os
from os import getenv
from uuid import uuid4
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage

member_expiration = int(getenv('USER_EXPIRATION'))
ins_expiration = int(getenv('INS_EXPIRATION'))
admin_expiration = int(getenv('ADMIN_EXPIRATION'))
upload_folder = getenv('UPLOAD_PATH')

def get_id_by_token() -> str:
    """get id from header token
    Return: id of the trainer or user
    """
    token = request.headers.get('X-token')
    if not token:
        abort(401, description='Missing token')
    id = redis_storage.get(token)
    if not id:
        raise KeyError('Key could not be found')
    return id

def save_profile_picture(upload: FileStorage) -> str:
    """save picture file"""
    name = secure_filename(upload.filename)
    path = os.path.join(upload_folder, name)
    upload.save(path)
    return path


def get_user_with_pic(cls, id) -> Dict:
    """get user picture"""
    user = storage.get(cls, id)
    if not user:
        abort(404, description='User not found')
    pic = user.picture
    if not pic:
        raise ValueError('User has no picture')
    # change pic from link to file in filepath
    with open(pic, 'rb') as f:
        file = f.read()
    user_dict = user.to_dict()
    user_dict['picture'] = file
    return user_dict

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
