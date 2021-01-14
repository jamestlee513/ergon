from .db import db


class TodoItem(db.Model):
    __tablename__ = "todo_items"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    priority_level = db.Column(db.Integer, nullable=True)
    is_done = db.Column(db.Boolean, nullable=False)

    user = db.relationship("User", back_populates="todo_items")
