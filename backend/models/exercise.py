# models/exercise.py

from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import BaseModel


class Exercise(BaseModel):
    __tablename__ = 'exercises'
    name = Column(String(255), nullable=False)
    description = Column(String(1000))
    workout_plan_id = Column(
        String(255),
        ForeignKey('workout_plans.id'),
        nullable=False)
    in_workout = relationship('WorkoutPlan', backref='in_wok_exerx', viewonly=True)
