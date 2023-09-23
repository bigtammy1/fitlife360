from sqlalchemy import Column, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from .base import BaseModel
from .user_profile import user_workout_plans


class WorkoutPlan(BaseModel):
    __tablename__ = 'workout_plans'
    name = Column(String(255), nullable=False)
    description = Column(String(1000))
    trainer_id = Column(
        String(255),
        ForeignKey('trainers.id'),
        nullable=False)
    plan_exercises = relationship('Exercise', backref='workout_plan_association')
    user_plans = relationship('UserProfile', secondary=user_workout_plans, back_populates='workout_plans')
