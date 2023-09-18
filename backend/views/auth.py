"""Authentication views"""

from flask import request, abort, jsonify, make_response
from views import app_views
from models import storage, redis_storage
from models.instructor import Instructor
from models.user import User
from hashlib import md5
from uuid import uuid4
from os import getenv


def generate_token() -> str:
    """generate uuid token"""
    return str(uuid4())


user_expiration = getenv('USER_EXPIRATION')
ins_expiration = getenv('INS_EXPIRATION')


@app_views.route('/user/login', methods=['POST', 'GET'], strict_slashes=False)
def user_login() -> str:
    """User login"""
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'Not a json'}), 401)
    email = data.get('email')
    password = data.get('password')
    if not email:
        return make_response(jsonify({'error': 'Missing email'}), 401)
    if not password:
        return make_response(jsonify({'error': 'Missing passwword'}), 401)
    # get the user
    user = storage.get_by(User, 'email', email)
    if not user:
        return make_response(jsonify({'error': 'Invalid credentials'}), 401)
    if user.password != md5(password.encode()).hexdigest():
        return make_response(jsonify({'error': 'Invalid credentials'}), 401)
    token = generate_token()
    key = f'user_{token}'
    redis_storage.set(key, user.id, user_expiration)
    return make_response(
        jsonify({'message': 'User login successful', 'token': token}), 200)


@app_views.route('/user/register', methods=['POST'], strict_slashes=False)
def user_register() -> str:
    """User registration"""
    data = request.get_json()
    name, email, gender, phone, password = data.values()
    if not name or not email or not gender or not password or not phone:
        return make_response(jsonify({'error': 'Missing credentials'}), 401)
    # check for user
    user = storage.get_by(User, 'email', email)
    if user:
        return make_response(jsonify({'error': 'User exists'}), 401)
    kwargs = {
        'name': name,
        'email': email,
        'gender': gender,
        'phone': phone,
        'password': password,
    }
    user = User(**kwargs)
    user.save()
    token = generate_token()
    key = f'user_{token}'
    redis_storage.set(key, user.id, user_expiration)
    return make_response(
        jsonify({'message': 'User created successfully', 'token': token}), 201)


# instructor authentication
@app_views.route('/instructor/login',
                 methods=['POST', 'GET'], strict_slashes=False)
def instructor_login() -> str:
    """Instructor login"""
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'Not a json'}), 401)
    email = data.get('email')
    password = data.get('password')
    if not email:
        return make_response(jsonify({'error': 'Missing email'}), 401)
    if not password:
        return make_response(jsonify({'error': 'Missing passwword'}), 401)
    # get the user
    instructor = storage.get_by(Instructor, 'email', email)
    if not instructor:
        return make_response(jsonify({'error': 'Invalid credentials'}), 401)
    if instructor.password != md5(password.encode()).hexdigest():
        return make_response(jsonify({'error': 'Invalid credentials'}), 401)
    token = generate_token()
    key = f'instructor_{token}'
    redis_storage.set(key, instructor.id, ins_expiration)
    return make_response(
        jsonify({'message': 'Instructor login successful', 'token': token}), 200)


@app_views.route('/instructor/register',
                 methods=['POST'], strict_slashes=False)
def instructor_register() -> str:
    """User login"""
    """User registration"""
    data = request.get_json()
    name, email, gender, phone, password = data.values()
    if not name or not email or not gender or not password or not phone:
        return make_response(jsonify({'error': 'Missing credentials'}), 401)
    # check for instructor
    instructor = storage.get_by(Instructor, 'email', email)
    if instructor:
        return make_response(jsonify({'error': 'User exists'}), 401)
    kwargs = {
        'name': name,
        'email': email,
        'gender': gender,
        'phone': phone,
        'password': password,
    }
    instructor = Instructor(**kwargs)
    instructor.save()
    token = generate_token()
    key = f'user_{token}'
    redis_storage.set(key, instructor.id, ins_expiration)
    return make_response(
        jsonify({'message': 'User created successfully', 'token': token}), 201)
