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
    email = column_property(User.email)
    name = column_property(User.name)
    gender = column_property(User.gender)
    phone = column_property(User.phone)
    user_id = Column(String(255), ForeignKey('users.id'), nullable=False)
    age = Column(Float)
    picture = Column(String(255))
    bio = Column(String(350))
    approach = Column(String(350))
    specializations = Column(String(1000))
    experience = Column(Float)
    classes = relationship("Class", backref="trainer")

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

    @hybrid_property
    def name(self):
        return self.user.name

    # Setter function for the 'name' property (optional)
    @name.setter
    def name(self, value):
        self.user.name = value

     # Getter function for the 'phone' property
    @hybrid_property
    def phone(self):
        return self.user.phone

    # Setter function for the 'phone' property (optional)
    @name.setter
    def phone(self, value):
        self.user.phone = value