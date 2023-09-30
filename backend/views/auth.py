"""Authentication views"""

from flask import request, abort, jsonify, make_response
from views import app_views
from models import storage, redis_storage
from models.trainer_profile import TrainerProfile
from models.user_profile import UserProfile
from models.user import User
from hashlib import md5
from utils import (
    get_id_by_token, generate_token, save_image,
    set_redis_key)


# Login
@app_views.route('/login', methods=['POST', 'GET'], strict_slashes=False)
def login() -> str:
    """User login"""
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'Not a json'}), 401)
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return make_response(jsonify({'error': 'Missing credentials'}), 401)
    # get the user
    user = storage.get_by(User, 'email', email)
    if not user:
        return make_response(jsonify({'error': 'User does not exist'}), 401)
    if user.password != md5(password.encode()).hexdigest():
        return make_response(jsonify({'error': 'Invalid credentials'}), 401)
    token = generate_token()
    key, expiration = set_redis_key(user, token)
    redis_storage.set(key, user.id, expiration)
    return make_response(
        jsonify({'message': 'User login successful',
                 'token': key, 'name': user.name}), 200)


@app_views.route('/register', methods=['POST'], strict_slashes=False)
def user_register() -> str:
    """User registration"""
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    gender = data.get('gender')
    phone = data.get('phone')
    password = data.get('password')
    if not name or not email or not gender or not password or not phone:
        return make_response(jsonify({'error': 'Missing credentials'}), 401)
    # check for user
    user = storage.get_by(User, 'email', email)
    if user:
        return make_response(jsonify({'error': 'User exists'}), 401)
    gender = gender.lower()
    kwargs = {
        'name': name,
        'email': email,
        'gender': gender,
        'phone': phone,
        'password': password,
    }
    user = User(**kwargs)
    user.save()
    key = f'auth_{generate_token()}'
    redis_storage.set(key, user.id, 1000)
    return make_response(
        jsonify({'message': 'User created successfully',
                 'name': user.name, 'token': key}), 201)


@app_views.route('/role', methods=['POST'], strict_slashes=False)
def roles():
    """sets user role to trainer or member"""
    data = request.get_json()
    if not data:
        abort(401)
    roles = data.get('role')
    if roles not in ['member', 'trainer', 'admin']:
        abort(401)
    try:
        id = get_id_by_token()
        user = storage.get(User, id)
        if not user:
            abort(401)
    except KeyError:
        abort(401)
    if roles == 'member':
        user.role = 'member'
    elif roles == 'trainer':
        user.role = 'trainer'
    user.save()
    token = generate_token()
    key, expiration = set_redis_key(user, token)
    redis_storage.set(key, user.id, expiration)
    return make_response(
        jsonify({'message': 'User role successful',
                 'token': key}), 201)



# trainer creation
@app_views.route('/trainer/create_profile',
                 methods=['POST'], strict_slashes=False)
def create_trainer() -> str:
    """trainer profile creation"""
    data = request.form
    if not data:
        return make_response(jsonify({'error': 'Not a json'}), 401)
    try:
        id = get_id_by_token()
    except KeyError:
        abort(401, description='No user id found')
    user = storage.get(User, id)
    if not user:
        abort(401, description="No user found")
    picture = request.files['picture']
    if not picture:
        abort(400, description="No picture provided")
    picture_url = save_image(picture, user.id)
    kwargs = {
        'user_id': id,
        'picture': picture_url,
        'bio': data.get('bio'),
        'approaches': data.get('approaches'),
        'specializations': data.get('specializations'),
        'experience': data.get('experience'),
        'age': data.get('age')
    }
    profile = TrainerProfile(**kwargs)
    profile.save()
    setattr(user, 'trainer_profile', profile)
    storage.save() 
    return make_response(
        jsonify({'message': 'Trainer profile creation successful'}), 201)


# trainer creation
@app_views.route('/member/create_profile',
                 methods=['POST'], strict_slashes=False)
def create_member() -> str:
    """Member profile"""
    data = request.form
    if not data:
        return make_response(jsonify({'error': 'Not a json'}), 401)
    try:
        id = get_id_by_token()
        print(id)
    except KeyError:
        return make_response(jsonify({'error': 'user id not found'}), 401)
    user = storage.get(User, id)
    if not user:
        return make_response(jsonify({'error': 'user not found'}), 401)
    picture = request.files['picture']
    if not picture:
        # abort(401)
        return make_response(jsonify({'error': 'picture not found'}), 400)
    picture_url = save_image(picture, user.id)
    kwargs = {
        'user_id': id,
        'picture': picture_url,
        'weight': data.get('weight'),
        'height': data.get('height'),
        'age': data.get('age'),
    }
    profile = UserProfile(**kwargs)
    profile.save()
    user.user_profile = profile
    storage.save() 
    return make_response(
        jsonify({'message': 'Member profile creation successful'}), 201)


@app_views.route('/logout', strict_slashes=False, methods=['POST'])
def logout():
    """logs out the user and delete the token on redis"""
    token = request.headers.get('Authorization')
    try:
        id = get_id_by_token()
        print(id)
        if id:
            redis_storage.delete(token)
            return make_response(jsonify({'message': 'Logged out successfully'}), 201)
        else:
            abort(403)
    except KeyError:
        abort(401)
