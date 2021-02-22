from flask import Blueprint, jsonify, request
from app.forms import EventForm
from app.models import Event, db
from app.util import validation_errors_to_error_messages
from datetime import date, timedelta

event_routes = Blueprint('event', __name__)


@event_routes.route('/<user_id>')
def get_user_events(user_id):
    today = date.today()
    tomorrow = date.today() + timedelta(days=1)
    result = Event.query.filter(
        Event.user_id == user_id).filter(Event.end_time >= today, Event.end_time <= tomorrow).all()
    # print("*********")
    # print(today)
    # print(result)
    # print("*********")
    events = [event.to_dict() for event in result]
    return {"events": events}


@ event_routes.route('/', methods=['POST'])
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
        db.session.add(event)
        db.session.commit()
        return {"event": event.to_dict()}
    return {"errors": validation_errors_to_error_messages(form.errors)}
