#!/usr/bin/python3
""" objects that handle all default RestFul API actions for members """

from models import storage
from models.user_profile import UserProfile
from models.user import User
from models.classes import Class
from views import app_views
from flask import abort, jsonify, make_response, request
from utils import get_id_by_token, get_user_with_pic, save_image


@app_views.route('/members', methods=['GET'], strict_slashes=False)
def get_members():
    """
    Retrieves the list of all member objects
    or a specific member
    """
    member = storage.get(User, id)
    if not member:
        abort(403)
    all_members = storage.all(User).values()
    list_members = [member.to_dict() for member in all_members if member.role == 'member']
    return make_response(jsonify(list_members), 200)


@app_views.route('/member', methods=['GET'], strict_slashes=False)
def get_member():
    """ Retrieves an member """
    try:
        id = get_id_by_token()
    except KeyError as e:
        abort(401, description=e)
    member = storage.get(User, id)
    if not member:
        abort(404)
    profile_id = member.user_profile.id
    return make_response(jsonify(get_user_with_pic(UserProfile, profile_id)), 200)


@app_views.route('/member', methods=['DELETE'],
                 strict_slashes=False)
def delete_member():
    """
    Deletes a member Object
    """
    try:
        id = get_id_by_token('member')
    except KeyError as e:
        abort(401, description=e)

    user = storage.get(User, id)
    if not user:
        abort(404)
    for v in storage.all(UserProfile).values():
        if v.user_id == id:
            member = v
    if not member:
        abort(403)
    storage.delete(member)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/create/members', methods=['POST'], strict_slashes=False)
def post_member():
    """
    Creates a member
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")

    data = request.get_json()
    instance = UserProfile(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/member', methods=['PUT'], strict_slashes=False)
def put_member():
    """
    Updates a member
    """
    try:
        id = get_id_by_token()
    except KeyError as e:
        abort(401, description=e)

    member = storage.get(User, id)

    if not member:
        abort(404)

    if not request.form:
        abort(400, description="No form sent")

    ignore = ['created_at', 'updated_at']

    data = request.form
    for key, value in data.items():
        if key not in ignore:
            setattr(member.user_profile, key, value)
    picture = request.files['picture']
    picture_url = save_image(picture, member.user_profile.id)
    member.user_profile.picture = picture_url
    storage.save()
    return make_response(jsonify({'message': 'update successful'}), 201)


@app_views.route('/member/classes', methods=['GET'], strict_slashes=False)
def get_member_classes():
    """get classes created by members"""
    try:
        id = get_id_by_token()
    except KeyError as e:
        abort(401, description=e)

    member = storage.get(User, id)

    if not member:
        abort(404)
    profile = member.user_profile
    cls_list = []
    classes = profile.classes
    for cls in classes:
        cls_list.append(cls.to_dict())
    return make_response(jsonify(cls_list), 200)
