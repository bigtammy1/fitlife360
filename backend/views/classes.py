#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Classs """
from models.classes import Class
from models import storage
from views import app_views
from flask import abort, jsonify, make_response, request
from utils import get_id_by_token


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


@app_views.route('/class', methods=['GET'], strict_slashes=False)
def get_classes():
    """ Retrieves an classes """
    try:
        id = get_id_by_token('User')
    except KeyError as e:
        abort(401, description=e)
    classes = storage.get(Class, id)
    if not classes:
        abort(404)

    return jsonify(classes.to_dict())


@app_views.route('/class', methods=['DELETE'],
                 strict_slashes=False)
def delete_classes(classes_id):
    """
    Deletes a classes Object
    """

    classes = storage.get(Class, classes_id)

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
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")

    data = request.get_json()
    instance = Class(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/class', methods=['PUT'], strict_slashes=False)
def put_classes():
    """
    Updates a classes
    """
    classes = storage.get(Class, id)

    if not classes:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(classes, key, value)
    storage.save()
    return make_response(jsonify(classes.to_dict()), 200)
