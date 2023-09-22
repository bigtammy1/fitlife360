#!/usr/bin/python3
""" User model"""

import models
from models.base import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import CheckConstraint, Column, ForeignKey, String, Float, Table
from sqlalchemy.orm import relationship
from hashlib import md5




class User(BaseModel):
    """Representation of a user """
    __tablename__ = 'users'
    email = Column(String(128), nullable=False, unique=True)
    password = Column(String(128), nullable=False)
    name = Column(String(128), nullable=True)
    phone = Column(String(20))
    gender = Column(String(60), CheckConstraint(
        "gender IN ('male', 'female')"), nullable=False)
    
    role = Column(String(50), CheckConstraint(
        "role IN ('member', 'trainer', 'admin' )"))
    user_profile = relationship('UserProfile', backref='user')
    trainer_profile = relationship('TrainerProfile', backref='user')
    

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = md5(value.encode()).hexdigest()
        super().__setattr__(name, value)
