#!/usr/bin/python3
""" trainer"""

import models
from models.base import BaseModel
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Float, ForeignKey
from sqlalchemy.orm import relationship, column_property
from .user import User


class TrainerProfile(BaseModel):
    """Representation of a user """
    __tablename__ = 'trainers'
    email = column_property(User.email)
    name = column_property(User.name)
    gender = column_property(User.gender)
    phone = column_property(User.phone)
    user_id = Column(String(255), ForeignKey('users.id'), nullable=False)
    picture = Column(String(255))
    bio = Column(String(350))
    approach = Column(String(255))
    specializations = Column(String())
    experience = Column(Float)
    classes = relationship("Class", backref="trainer")

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)
