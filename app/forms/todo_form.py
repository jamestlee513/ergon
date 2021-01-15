from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import TodoItem


class TodoForm(FlaskForm):
    user_id = StringField('user_id', validators=[DataRequired()])
    todo = StringField('todo', validators=[DataRequired()])
    priority_level = IntegerField(
        'priority_level', validators=[DataRequired()])
