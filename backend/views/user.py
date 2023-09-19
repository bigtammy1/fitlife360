#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from models.user import User
from models import storage
from views import app_views
from flask import abort, jsonify, make_response, request
from utils import get_id_by_token


@app_views.route('/users', methods=['GET'], strict_slashes=False)
def get_users():
    """
    Retrieves the list of all user objects
    or a specific user
    """
    try:
        id = get_id_by_token('User')
    except KeyError as e:
        abort(401, description=e)
    user = storage.get(User, id)
    if not user:
        abort(404, description="User not found")
    all_users = storage.all(User).values()
    list_users = []
    for user in all_users:
        list_users.append(user.to_dict())
    return jsonify(list_users)


@app_views.route('/user', methods=['GET'], strict_slashes=False)
def get_user():
    """ Retrieves an user """
    try:
        id = get_id_by_token('User')
    except KeyError as e:
        abort(401, description=e)
    user = storage.get(User, id)
    if not user:
        abort(404)

    return jsonify(user.to_dict())


@app_views.route('/user', methods=['DELETE'],
                 strict_slashes=False)
def delete_user():
    """
    Deletes a user Object
    """
    try:
        id = get_id_by_token('User')
    except KeyError as e:
        abort(401, description=e)
    user = storage.get(User, id)

    if not user:
        abort(404)

    storage.delete(user)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/user', methods=['POST'], strict_slashes=False)
def post_user():
    """
    Creates a user
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")

    data = request.get_json()
    instance = User(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/user', methods=['PUT'], strict_slashes=False)
def put_user():
    """
    Updates a user
    """
    try:
        id = get_id_by_token('User')
    except KeyError as e:
        abort(401, description=e)
    user = storage.get(User, id)

    if not user:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'email', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(user, key, value)
    storage.save()
    return make_response(jsonify(user.to_dict()), 200)
