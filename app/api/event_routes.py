from flask import Blueprint, jsonify, request
from app.forms import EventForm
from app.models import Event, db
from app.util import validation_errors_to_error_messages

event_routes = Blueprint('event', __name__)


@event_routes.route('/', methods=['POST'])
def post_user_event():
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event(
            user_id=form.data['user_id'],
            title=form.data['title'],
            start_time=form.data['start_time'],
            end_time=form.data['end_time'],
            description=form.data['description'],
            background_color=form.data['background_color']
        )
        return {"event": event.to_dict()}
    return {"errors": validation_errors_to_error_messages(form.errors)}
