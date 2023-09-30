#!/usr/bin/python3
""" objects that handle all default RestFul API actions for goals """

from models import storage
from models.user_profile import UserProfile
from models.user import User
from models.classes import Class
from models.goal import Goal
from views import app_views
from flask import abort, jsonify, make_response, request
from utils import get_id_by_token, get_user_image, save_image


@app_views.route('/goals', methods=['GET'], strict_slashes=False)
def get_goals():
    """ Retrieves the list of all Goal objects """
    try:
        id = get_id_by_token()
    except KeyError:
        return make_response(jsonify({'error': 'Unauthorized access'}), 401)
    user = storage.get(User, id)
    profile_id = user.user_profile.id
    goals = storage.all(Goal).values()
    goals_list = []
    for goal in goals:
        if goal.user_profile_id == profile_id:
            goals_list.append(goal.to_dict())
    return jsonify(goals_list)


@app_views.route('/goal/<goal_id>', methods=['PUT'], strict_slashes=False)
def update_goal(goal_id) -> str:
    """update a user goal"""
    try:
        id = get_id_by_token()
    except KeyError:
        return make_response(jsonify({'error': 'Unauthorized access'}), 401)
    goal = storage.get(Goal, goal_id)
    ignore = ['created_at', 'updated_at', '__class__']
    data = request.get_json()
    for k, v in data.items():
        if k not in ignore:
            setattr(goal, k, v)
    storage.save()
    return make_response(jsonify({'message': 'goal successfully updated', 'goal': goal.to_dict()}), 201)


@app_views.route('/goals', methods=['POST'], strict_slashes=False)
def create_goal():
    """create a new goal"""
    try:
        id = get_id_by_token()
    except KeyError:
        return make_response(jsonify({'error': 'Unauthorized access'}), 401)
    user = storage.get(User, id)
    if not user:
        return make_response(jsonify({'error': 'Unauthorized access'}), 401)
    profile_id = user.user_profile.id
    data = request.get_json()
    goal = Goal(**data)
    goal.user_profile_id = profile_id
    goal.save()
    return make_response(jsonify({'message': 'Goal creation successful',
                                  'goal': goal.to_dict()}), 201)


@app_views.route('/goal/<goal_id>', methods=['DELETE'], strict_slashes=False)
def delete_goal(goal_id):
    """deletes a goal"""
    try:
        id = get_id_by_token()
    except KeyError:
        return make_response(jsonify({'error': 'Unauthorized access'}), 401)
    goal = storage.get(Goal, goal_id)
    if not goal:
        return make_response(jsonify({'error': 'Goal does not exist'}), 400)
    storage.delete(goal)
    return make_response(jsonify({'message': 'goal deleted successfully'}), 201)
