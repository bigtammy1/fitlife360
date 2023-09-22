# models/goal.py

from sqlalchemy import Column, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from .base import BaseModel


class Goal(BaseModel):
    __tablename__ = 'goals'
    name = Column(String(255), nullable=False)
    description = Column(String(1000))
    user_profile_id = Column(
        String(255), ForeignKey('user_profiles.id'), nullable=False)
    done = Column(Boolean, default=False)
