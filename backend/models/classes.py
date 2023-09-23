#!/usr/bin/env python3
"""Gym class model"""

from sqlalchemy import Column, DateTime, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .base import BaseModel
from .user_profile import user_classes


class Class(BaseModel):
    __tablename__ = 'classes'
    name = Column(String(255), nullable=False)
    description = Column(String(1000))
    trainer_id = Column(
        String(255),
        ForeignKey('trainers.id'),
        nullable=False)
    location = Column(String(255))
    date_and_time = Column(DateTime, nullable=False)
    duration_minutes = Column(Integer)
    capacity = Column(Integer)
    image_url = Column(String(255))
    class_users = relationship(
        'UserProfile',
        secondary=user_classes,
        back_populates="classes")
