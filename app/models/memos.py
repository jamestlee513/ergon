from .db import db


class Memo(db.Model):
    __tablename__ = "memos"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    text = db.Column(db.Text, nullable=True)

    user = db.relationship("User", back_populates="memo")
