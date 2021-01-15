from .db import db


class TodoItem(db.Model):
    __tablename__ = "todo_items"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    todo = db.Column(db.String(50), nullable=False)
    priority_level = db.Column(db.Integer, nullable=True)
    is_done = db.Column(db.Boolean, nullable=False)

    user = db.relationship("User", back_populates="todo_items")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "todo": self.todo,
            "priority_level": self.priority_level,
            "is_done": self.is_done
        }
