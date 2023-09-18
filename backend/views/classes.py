#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Classs """
from models.classes import Class
from models import storage
from .views import app_views
from flask import abort, jsonify, make_response, request



@app_views.route('/classess', methods=['GET'], strict_slashes=False)
def get_classess():
    """
    Retrieves the list of all classes objects
    or a specific classes
    """
    all_classess = storage.all(Class).values()
    list_classess = []
    for classes in all_classess:
        list_classess.append(classes.to_dict())
    return jsonify(list_classess)


@app_views.route('/classess/<classes_id>', methods=['GET'], strict_slashes=False)
def get_classes(classes_id):
    """ Retrieves an classes """
    classes = storage.get(Class, classes_id)
    if not classes:
        abort(404)

    return jsonify(classes.to_dict())


@app_views.route('/classess/<classes_id>', methods=['DELETE'],
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


@app_views.route('/classess', methods=['POST'], strict_slashes=False)
def post_classes():
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


@app_views.route('/classess/<classes_id>', methods=['PUT'], strict_slashes=False)
def put_classes(classes_id):
    """
    Updates a classes
    """
    classes = storage.get(Class, classes_id)

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
