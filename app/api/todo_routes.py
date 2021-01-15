from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import TodoForm
from app.models import TodoItem, db
from app.util import validation_errors_to_error_messages

todo_routes = Blueprint('todo', __name__)


@todo_routes.route('/<user_id>')
def getUserTodos(user_id):
    result = TodoItem.query.filter(TodoItem.user_id == user_id).all()
    todos = [todo.to_dict() for todo in result]
    return {"todos": todos}


@todo_routes.route('/', methods=['POST'])
def newTodo():
    form = TodoForm()
    print(request.get_json())
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        todo = TodoItem(
            user_id=form.data['user_id'],
            todo=form.data['todo'],
            priority_level=form.data['priority_level'],
            is_done=False
        )
        db.session.add(todo)
        db.session.commit()
        return todo.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@todo_routes.route('/<todo_id>')
def removeTodo(todo_id):
    todo = TodoItem.query.get(todo_id)
    if todo is not None:
        db.session.delete(todo)
        db.session.commit()

        result = TodoItem.query.filter(TodoItem.user_id == user_id).all()
        todos = [todo.to_dict() for todo in result]
        return {"todos": todos}
    else:
        return {"errors": f"id {todo_id} not found"}
