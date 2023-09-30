#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Classs """
from models import storage
from models.classes import Class
from models.user import User
from models.trainer_profile import TrainerProfile
from views import app_views
from flask import abort, jsonify, make_response, request
from utils import get_id_by_token


@app_views.route('/validate/<class_id>', methods=['GET'], strict_slashes=False)
def validate_trainer(class_id):
    """checks if a trainer owns a class"""
    token = request.headers.get('Authorization')
    if token.split('_')[0] not in ['trainer', 'admin']:
        make_response(jsonify({'error': "You are not authorized to take this action"}), 401)
    try:
        id = get_id_by_token()
    except KeyError as e:
        abort(401, description=e)
    classes = storage.get(Class, class_id)
    if not classes:
        abort(404)
    user = storage.get(User, id)
    if not user:
        abort(401)
    if user.trainer_profile.id != class_id:
        make_response(jsonify({'error': "You are not authorized to take this action"}), 401)
    else:
        return make_response(jsonify({'message': 'User can edit'}), 200)


@app_views.route('/classes', methods=['GET'], strict_slashes=False)
def get_classes():
    """
    Retrieves the list of all classes objects
    or a specific classes
    """
    all_classes = storage.all(Class).values()
    list_classes = []
    for classes in all_classes:
        list_classes.append(classes.to_dict())
    return jsonify(list_classes)


@app_views.route('/class/<class_id>', methods=['GET'], strict_slashes=False)
def get_class(class_id):
    """ Retrieves a class """
    try:
        id = get_id_by_token()
    except KeyError as e:
        abort(401, description=e)
    classes = storage.get(Class, class_id)
    if not classes:
        abort(404)
    return jsonify(classes.to_dict())


@app_views.route('/class/<class_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_class(class_id):
    """
    Deletes a classes Object
    """
    try:
        id = get_id_by_token()
    except KeyError as e:
        abort(401, description=e)
    classes = storage.get(Class, class_id)
    if not classes:
        abort(404)
    storage.delete(classes)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/class', methods=['POST'], strict_slashes=False)
def post_class():
    """
    Creates a classes
    """
    try:
        id = get_id_by_token()
    except KeyError:
        abort(401)
    if not request.get_json():
        abort(400, description="Not a JSON")

    user = storage.get(User, id)
    if not user:
        abort(401)
    data = request.get_json()
    instance = Class(**data)
    instance.trainer_id = user.trainer_profile.id
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/class/<class_id>', methods=['PUT'], strict_slashes=False)
def put_class(class_id):
    """
    Updates a classes
    """
    token = request.headers.get('Authorization')
    if token.split('_')[0] not in ['trainer', 'admin']:
        abort(401)
    try:
        id = get_id_by_token()
    except KeyError:
        abort(401)

    classes = storage.get(Class, class_id)

    if not classes:
        abort(404)
    if classes.trainer_id != id:
        abort(401)
    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(classes, key, value)
    storage.save()
    return make_response(jsonify(classes.to_dict()), 200)

# book a class
@app_views.route('/class/<class_id>/book', methods=['PUT'], strict_slashes=False)
def book_class(class_id):
    """Book a class"""
    try:
        id = get_id_by_token()
    except KeyError:
        abort(401)
    classes = storage.get(Class, class_id)
    if not classes:
        abort(404)
    user = storage.get(User, id)
    if not user:
        abort(401)
    if user.user_profile.id in [user.id for user in classes.class_users]:
        abort(400, description="User already booked this class")
    if len(classes.class_users) >= classes.capacity:
        abort(400, description="Class is full")
    classes.class_users.append(user.user_profile)
    storage.save()
    return make_response(jsonify(classes.to_dict()), 200)
