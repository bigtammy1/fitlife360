#!/usr/bin/python3
""" Instructor"""

import models
from models.base import BaseModel
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Float, CheckConstraint
from sqlalchemy.orm import relationship
from hashlib import md5


class Instructor(BaseModel):
    """Representation of a user """

    __tablename__ = 'instructors'
    email = Column(String(128), nullable=False, unique=True)
    password = Column(String(128), nullable=False)
    name = Column(String(128), nullable=True)
    gender = Column(String(60), CheckConstraint("gender IN ('male', 'female')"), nullable=False)
    picture = Column(String(255))
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
