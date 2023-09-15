#!/usr/bin/env python3
"""Gym class model"""

from sqlalchemy import Column, DateTime, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .base import BaseModel


class Class(BaseModel):
    __tablename__ = 'classes'
    name = Column(String(255), nullable=False)
    description = Column(String(1000))
    instructor_id = Column(String(255), ForeignKey('instructors.id') , nullable=False)
    location = Column(String(255))
    date_and_time = Column(DateTime, nullable=False)
    duration_minutes = Column(Integer)
    capacity = Column(Integer)
    image_url = Column(String(255))