#!/usr/bin/python3
""" User model"""

import models
from models.base import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import CheckConstraint, Column, ForeignKey, String, Float, Table
from sqlalchemy.orm import relationship
from hashlib import md5

user_classes = Table('user_classes', Base.metadata,
    Column('user_id', String(60), ForeignKey('users.id')),
    Column('class_id', String(60), ForeignKey('classes.id'))
)


class User(BaseModel):
    """Representation of a user """
    __tablename__ = 'users'
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    name = Column(String(128), nullable=True)
    picture = Column(String(255))
    gender = Column(String(60), CheckConstraint("gender in ('male', 'female')"), nullable=False)
    phone = Column(String(20))
    classes = relationship('Class', secondary=user_classes, back_populates='users')

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = md5(value.encode()).hexdigest()
        super().__setattr__(name, value)
