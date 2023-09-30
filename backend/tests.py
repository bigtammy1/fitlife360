#!/usr/bin/env python3

from models import *
from datetime import datetime

# Create 3 users that are members
user1 = User(name="User1", email="user1@example.com", role='member', gender="male", password="password1")
user1.save()
user2 = User(name="User2", email="user2@example.com", gender="female", role='member', password="password2")
user2.save()
user3 = User(name="User3", email="user3@example.com", gender="male", role='member', password="password3")
user3.save()

# Create 3 users that are trainers
trainer1 = User(name="Trainer1", email="trainer1@example.com", password="password4", gender="female", role='trainer')
trainer1.save()
trainer2 = User(name="Trainer2", email="trainer2@example.com", password="password5", gender="female", role='trainer')
trainer2.save()
trainer3 = User(name="Trainer3", email="trainer3@example.com", password="password6", gender="male", role='trainer')
trainer3.save()

# Create user profiles for the members
user_profile1 = UserProfile(user=user1, age=25, gender="Male")
user_profile2 = UserProfile(user=user2, age=30, gender="Female")
user_profile3 = UserProfile(user=user3, age=35, gender="Male")
storage.save()

# Create trainer profiles for the trainers
trainer_profile1 = TrainerProfile(trainer=trainer1, experience="5 years", specialization="Weightlifting")
trainer_profile2 = TrainerProfile(trainer=trainer2, experience="3 years", specialization="Yoga")
trainer_profile3 = TrainerProfile(trainer=trainer3, experience="2 years", specialization="Cardio")
storage.save()

# Create 5 classes using the trainer profiles
class1 = Class(name="Class1", description="Class 1 description", trainer_id=trainer_profile1.id, location="Gym 1", date_and_time=datetime.now(), duration_minutes=60, capacity=10)
class1.save()
class2 = Class(name="Class2", description="Class 2 description", trainer_id=trainer_profile1.id, location="Gym 2", date_and_time=datetime.now(), duration_minutes=60, capacity=15)
class2.save()
class3 = Class(name="Class3", description="Class 3 description", trainer_id=trainer_profile2.id, location="Gym 3", date_and_time=datetime.now(), duration_minutes=60, capacity=20)
class3.save()
class4 = Class(name="Class4", description="Class 4 description", trainer_id=trainer_profile2.id, location="Gym 4", date_and_time=datetime.now(), duration_minutes=60, capacity=25)
class4.save()
class5 = Class(name="Class5", description="Class 5 description", trainer_id=trainer_profile3.id, location="Gym 5", date_and_time=datetime.now(), duration_minutes=60, capacity=30)
class5.save()


# Add user profiles to the classes
class1.class_users.append(user_profile1)
class2.class_users.append(user_profile2)
class3.class_users.append(user_profile3)
class4.class_users.append(user_profile1)
class5.class_users.append(user_profile2)
storage.save()

# Create 5 goals for each of the users
for i in range(1, 6):
    goal1 = Goal(name=f"Goal {i} for User1", description=f"Goal {i} description", user_profile_id=user_profile1.id)
    goal1.save()
    goal2 = Goal(name=f"Goal {i} for User2", description=f"Goal {i} description", user_profile_id=user_profile2.id)
    goal2.save()
    goal3 = Goal(name=f"Goal {i} for User3", description=f"Goal {i} description", user_profile_id=user_profile3.id)
    goal3.save()

# Create 5 workouts each for the trainers with their exercises
for i in range(1, 6):
    workout1 = WorkoutPlan(name=f"Workout {i} for Trainer1", description=f"Workout {i} description", trainer_id=trainer_profile1.id)
    workout1.save()
    workout2 = WorkoutPlan(name=f"Workout {i} for Trainer2", description=f"Workout {i} description", trainer_id=trainer_profile2.id)
    workout2.save()
    workout3 = WorkoutPlan(name=f"Workout {i} for Trainer3", description=f"Workout {i} description", trainer_id=trainer_profile3.id)
    workout3.save()

    exercise1 = Exercise(name=f"Exercise 1 for Workout {i}", description=f"Exercise 1 description", workout_plan_id=workout1.id)
    exercise1.save()
    exercise2 = Exercise(name=f"Exercise 2 for Workout {i}", description=f"Exercise 2 description", workout_plan_id=workout2.id)
    exercise2.save()
    exercise3 = Exercise(name=f"Exercise 3 for Workout {i}", description=f"Exercise 3 description", workout_plan_id=workout3.id)
    exercise3.save()

# Commit the changes to the database
storage.save()

print("Database initialized")
print("Users:")
for user in storage.all(User).values():
    print(user)
print("User profiles:")
for user_profile in storage.all(UserProfile).values():
    print(user_profile)
print("Trainer profiles:")
for trainer_profile in storage.all(TrainerProfile).values():
    print(trainer_profile)
print("Classes:")
for class_ in storage.all(Class).values():
    print(class_)
print("Goals:")
for goal in storage.all(Goal).values():
    print(goal)
print("Workout plans:")
for workout_plan in storage.all(WorkoutPlan).values():
    print(workout_plan)
print("Exercises:")
for exercise in storage.all(Exercise).values():
    print(exercise)

