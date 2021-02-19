from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField, TextField
from wtforms.validators import DataRequired
from app.models import Event


# def time_overlaps(form, field):
#     start_time = field.data


class EventForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    description = TextField('description')
    background_color = StringField('background_color')
    start_time = DateField('start_time', validators=[DataRequired()])
    end_time = DateField('end_time', validators=[DataRequired()])
