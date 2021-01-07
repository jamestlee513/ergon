from .db import db


class UserSetting(db.Model):
    __tablename__ = "user_settings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    memo_is_display = db.Column(db.Boolean, nullable=False)
    pomodoro_is_display = db.Column(db.Boolean, nullable=False)
    day_planner_is_display = db.Column(db.Boolean, nullable=False)
    todo_is_display = db.Column(db.Boolean, nullable=False)
    pomodoro_work_interval = db.Column(db.Integer, nullable=False)
    pomodoro_break_interval = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="user_setting")
