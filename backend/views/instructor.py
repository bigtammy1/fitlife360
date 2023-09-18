#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Instructors """
from models.instructor import Instructor
from models import storage
from .views import app_views
from flask import abort, jsonify, make_response, request



@app_views.route('/instructors', methods=['GET'], strict_slashes=False)
def get_instructors():
    """
    Retrieves the list of all instructor objects
    or a specific instructor
    """
    all_instructors = storage.all(Instructor).values()
    list_instructors = []
    for instructor in all_instructors:
        list_instructors.append(instructor.to_dict())
    return jsonify(list_instructors)


@app_views.route('/instructors/<instructor_id>', methods=['GET'], strict_slashes=False)
def get_instructor(instructor_id):
    """ Retrieves an instructor """
    instructor = storage.get(Instructor, instructor_id)
    if not instructor:
        abort(404)

    return jsonify(instructor.to_dict())


@app_views.route('/instructors/<instructor_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_instructor(instructor_id):
    """
    Deletes a instructor Object
    """

    instructor = storage.get(Instructor, instructor_id)

    if not instructor:
        abort(404)

    storage.delete(instructor)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/instructors', methods=['POST'], strict_slashes=False)
def post_instructor():
    """
    Creates a instructor
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")

    data = request.get_json()
    instance = Instructor(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/instructors/<instructor_id>', methods=['PUT'], strict_slashes=False)
def put_instructor(instructor_id):
    """
    Updates a instructor
    """
    instructor = storage.get(Instructor, instructor_id)

    if not instructor:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'email', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(instructor, key, value)
    storage.save()
    return make_response(jsonify(instructor.to_dict()), 200)
