#!/usr/bin/python3
""" objects that handle all default RestFul API actions for trainers """

from models import storage
from models.trainer_profile import TrainerProfile
from models.user import User
from models.classes import Class
from views import app_views
from flask import abort, jsonify, make_response, request
from utils import get_id_by_token, get_user_with_pic, save_image


@app_views.route('/trainers', methods=['GET'], strict_slashes=False)
def get_trainers():
    """
    Retrieves the list of all trainer objects
    or a specific trainer
    """
    all_trainers = storage.all(TrainerProfile).values()
    list_trainers = [get_user_with_pic(TrainerProfile, trainer.id) for trainer in all_trainers]
    return make_response(jsonify(list_trainers), 200)


@app_views.route('/trainer', methods=['GET'], strict_slashes=False)
def get_trainer():
    """ Retrieves an trainer """
    try:
        id = get_id_by_token()
    except KeyError as e:
        return make_response(jsonify({'error': 'User not found'}), 401)
    trainer = storage.get(User, id)
    if not trainer:
        abort(404)
    profile_id = trainer.trainer_profile.id
    return make_response(jsonify(get_user_with_pic(TrainerProfile, profile_id)), 200)


@app_views.route('/trainer', methods=['DELETE'],
                 strict_slashes=False)
def delete_trainer():
    """
    Deletes a trainer Object
    """
    try:
        id = get_id_by_token('trainer')
    except KeyError as e:
        abort(401, description=e)

    user = storage.get(User, id)
    if not user:
        abort(404)
    for v in storage.all(TrainerProfile).values():
        if v.user_id == id:
            trainer = v
    if not trainer:
        abort(403)
    storage.delete(trainer)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/create/trainers', methods=['POST'], strict_slashes=False)
def post_trainer():
    """
    Creates a trainer
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")

    data = request.get_json()
    instance = TrainerProfile(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/trainer', methods=['PUT'], strict_slashes=False)
def put_trainer():
    """
    Updates a trainer
    """
    try:
        id = get_id_by_token()
    except KeyError as e:
        abort(401, description=e)

    trainer = storage.get(User, id)

    if not trainer:
        abort(404)

    if not request.form:
        abort(400, description="No form sent")

    ignore = ['created_at', 'updated_at', '__class__']

    data = request.form
    for key, value in data.items():
        if key not in ignore:
            setattr(trainer.trainer_profile, key, value)
    picture = request.files['picture']
    picture_url = save_image(picture, trainer.trainer_profile.id)
    trainer.trainer_profile.picture = picture_url
    storage.save()
    return make_response(jsonify({'message': 'update successful'}), 201)


@app_views.route('/trainer/classes', methods=['GET'], strict_slashes=False)
def get_trainer_classes():
    """get classes created by trainers"""
    classes = storage.all(Class).values()
    try:
        id = get_id_by_token()
    except KeyError as e:
        abort(401, description=e)

    trainer = storage.get(User, id)

    if not trainer:
        abort(404)
    profile = trainer.trainer_profile
    cls_list = []
    for cls in classes:
        if cls.trainer_id == profile.id:
            cls_list.append(cls.to_dict())
    return make_response(jsonify(cls_list), 200)
