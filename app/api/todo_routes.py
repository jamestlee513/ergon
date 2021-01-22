from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required
from app.forms import TodoForm
from app.models import TodoItem, db
from app.util import validation_errors_to_error_messages

todo_routes = Blueprint('todo', __name__)


@todo_routes.route('/<user_id>')
def get_user_todos(user_id):
    result = TodoItem.query.filter(TodoItem.user_id == user_id).order_by(
        TodoItem.priority_level.desc(), TodoItem.created_at.desc()).all()
    todos = [todo.to_dict() for todo in result]
    return {"todos": todos}


@todo_routes.route('', methods=['POST'])
def new_todo():
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
        return redirect(url_for('todo.get_user_todos',
                                user_id=form.data['user_id']))
    return {'errors': validation_errors_to_error_messages(form.errors)}


@todo_routes.route('', methods=['DELETE'])
def remove_todo():
    todo_id = request.json['todo_id']
    user_id = request.json['user_id']

    todo = TodoItem.query.get(todo_id)
    if todo is not None:
        db.session.delete(todo)
        db.session.commit()

        result = TodoItem.query.filter(TodoItem.user_id == user_id).order_by(
            TodoItem.priority_level.desc(), TodoItem.created_at.desc()).all()
        todos = [todo.to_dict() for todo in result]
        return {"todos": todos}
    return {"errors": f"id {todo_id} not found"}


@todo_routes.route('/<todo_id>', methods=['PUT'])
def edit_todo(todo_id):
    todo = TodoItem.query.get(todo_id)

    todo.todo = request.json.get('todo', todo.todo)
    todo.priority_level = request.json.get(
        'priority_level', todo.priority_level)
    todo.is_done = request.json.get('is_done', todo.is_done)

    db.session.commit()
    return todo.to_dict()


@todo_routes.route('/clear_completed', methods=['DELETE'])
def clear_done_todos():
    user_id = request.json['user_id']
    done_todos = TodoItem.query.filter(
        TodoItem.user_id == user_id, TodoItem.is_done == True)

    for done_todo in done_todos:
        db.session.delete(done_todo)
    db.session.commit()

    result = TodoItem.query.filter(TodoItem.user_id == user_id).order_by(
        TodoItem.priority_level.desc(), TodoItem.created_at.desc()).all()
    todos = [todo.to_dict() for todo in result]
    return {"todos": todos}
