#!/usr/bin/python3
""" trainer"""


from models.base import BaseModel
from sqlalchemy import Column, String, Float, ForeignKey
from sqlalchemy.orm import relationship, column_property
from sqlalchemy.ext.hybrid import hybrid_property
from .user import User


class TrainerProfile(BaseModel):
    """Representation of a user """
    __tablename__ = 'trainers'
    user_id = Column(String(255), ForeignKey('users.id'), nullable=False)
    age = Column(Float)
    picture = Column(String(255))
    bio = Column(String(350))
    approaches = Column(String(350))
    specializations = Column(String(1000))
    experience = Column(Float)
    classes = relationship("Class", backref="trainer")

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)
