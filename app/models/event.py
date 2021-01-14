from .db import db


class Event(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(80), nullable=False)
    start_time = db.Column(db.Date, nullable=False)
    end_time = db.Column(db.Date, nullable=False)
    description = db.Column(db.String, nullable=True)
    background_color = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="events")
