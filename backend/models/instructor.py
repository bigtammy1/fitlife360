#!/usr/bin/python3
""" holds class User"""

import models
from models.base import BaseModel
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Float
from sqlalchemy.orm import relationship
from hashlib import md5


class Instructor(BaseModel):
    """Representation of a user """

    __tablename__ = 'instructors'
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    picture = Column(String(255))
    email = Column(String(100), nullable=False)
    phone = Column(String(20))
    bio = Column(String(255))
    approach = Column(String(255))
    specializations = Column(String(255))
    experience_years = Column(Float)
    classes = relationship("Class", backref="user")

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = md5(value.encode()).hexdigest()
        super().__setattr__(name, value)
