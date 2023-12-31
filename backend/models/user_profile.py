#!/usr/bin/python3
""" User model"""

import models
from models.base import BaseModel, Base
from models.user import User
import sqlalchemy
from sqlalchemy import Column, ForeignKey, String, Float, Table
from sqlalchemy.orm import relationship, column_property
from sqlalchemy.ext.hybrid import hybrid_property


user_classes = Table('user_classes', Base.metadata,
                     Column('user_profile_id', String(60), ForeignKey('user_profiles.id')),
                     Column('class_id', String(60), ForeignKey('classes.id'))
                     )
user_workout_plans = Table('user_workout_plans', Base.metadata,
                           Column('user_profile_id', String(60), ForeignKey('user_profiles.id')),
                           Column('workout_plan_id', String(60), ForeignKey('workout_plans.id'))
                           )

class UserProfile(BaseModel):
    """User profile"""
    __tablename__ = 'user_profiles'
    age = Column(Float)
    picture = Column(String(255))
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    weight = Column(Float)
    height = Column(Float)
    classes = relationship(
        'Class', secondary=user_classes, back_populates='class_users')
    workout_plans = relationship(
        'WorkoutPlan', secondary=user_workout_plans, back_populates='user_plans')
    goals = relationship('Goal', backref='user_profile')
