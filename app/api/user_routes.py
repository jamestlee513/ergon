from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, TodoItem, Memo, Event, db
from app.seeds.demo_seed import demo_objects

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/demo_reset', methods=["PUT"])
def reset_demo():
    todos = TodoItem.query.filter(TodoItem.user_id == 1).all()
    memo = Memo.query.filter(Memo.user_id == 1).first()
    events = Event.query.filter(Event.user_id == 1).all()

    for todo in todos:
        db.session.delete(todo)
    for event in events:
        db.session.delete(event)
    if memo is not None:
        db.session.delete(memo)
    db.session.bulk_save_objects(demo_objects)
    db.session.commit()
    return {"result": "success!"}
