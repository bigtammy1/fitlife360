from flask import request, abort
from models import redis_storage


def get_id_by_token(u_or_i: str) -> str:
    """get id from header token
    u_or_i : User or Instructor as string
    Return: id of the instructor or user
    """
    token = request.headers.get('X-token')
    if not token:
        abort(401, description='Missing token')
    key = ''
    if u_or_i == 'User':
        key = f'user_{token}'
    elif u_or_i == 'Instructor':
        key = f'instructor_{token}'
    id = redis_storage.get(key)
    if not id:
        raise KeyError('Key could not be found')
    return id
