from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import TodoItem

todo_routes = Blueprint('todo', __name__)


@todo_routes.route('/', methods=['POST'])
def newTodo():
    pass