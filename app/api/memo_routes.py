from flask import Blueprint, jsonify, request, redirect
from app.models import Memo, db

memo_routes = Blueprint('memo', __name__)


@memo_routes.route('/<user_id>')
def get_user_memo(user_id):
    result = Memo.query.filter(Memo.user_id == user_id).first()
    if result is not None:
        return {"memo": result.to_text()}
    return {"error": "Could not find user memo!"}


@memo_routes.route('/', methods=['POST'])
def new_memo():
    user_id = request.json.get('user_id')
    result = Memo.query.filter(Memo.user_id == user_id).first()
    if result is None:
        memo = Memo(
            user_id=user_id,
            text=""
        )
        db.session.add(memo)
        db.session.commit()
        return {"memo": memo.to_text()}
    return {"error": "User memo already exists!"}


@memo_routes.route('/', methods=['PUT'])
def edit_memo():
    memo = Memo.query.filter(
        Memo.user_id == request.json.get('user_id')).first()

    if memo is not None:
        memo.text = request.json.get('text', memo.text)
        db.session.commit()
        return {"memo": memo.to_text()}

    return {"error": "Could not find user memo!"}
