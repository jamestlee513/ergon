from flask import Blueprint, jsonify, request
from app.models import Event, db
from datetime import datetime

event_routes = Blueprint('event', __name__)


@event_routes.route('/', methods=['POST'])
def post_user_event():
    user_id = request.json.get('user_id')
    title = request.json.get('title')
    # start_time = request.json.get('start_time')
    # end_time = request.json.get('end_time')
    description = request.json.get('description')
    background_color = request.json.get('background_color')
    
    start_time = datetime.today.replace()

    print('****')
    print(start_time)
    print('****')

    return {"success": start_time}
