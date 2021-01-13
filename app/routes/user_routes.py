from flask import Blueprint, session, request, jsonify, make_response
from app.models import User, db
from app.forms import LoginForm, SignupForm
from flask_login import login_user, logout_user, login_required
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, set_access_cookies, current_user,
    set_refresh_cookies, unset_jwt_cookies, get_raw_jwt,
    decode_token
)

user_routes = Blueprint("users", __name__)


def validation_errors_to_error_messages(validation_errors):
    '''
    Simple function that turns the WTForms validation errors into a simple list
    '''
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field.title()} : {error}")
        return errorMessages


@user_routes.route("/test")
@jwt_required
def test_route():
    user = get_jwt_identity()
    print(user)
    return {"Success": True}


@user_routes.route("/", methods=["POST"])
def authenticate():
    '''
    Authenticates a user.
    '''

    token = (request.json['token'])
    # token = decode_token(request.data.decode("utf-8"))
    print("hello")
    # if current_user.is_authenticated:
    #     return current_user.to_dict()
    print("\n\nERROR (401): User not authetnicated \n\n")
    return {"errors": ["Unauthorized"]}


@ user_routes.route("/login", methods=["POST"])
def login():
    '''
    Logs a user in
    '''
    form = LoginForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually so validate_on_submit can be used
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data["email"]).first()
        access_token = create_access_token(identity=user.email)
        refresh_token = create_access_token(identity=user.email)
        resp = jsonify({'login': True, "user": user.to_dict()})
        set_access_cookies(resp, access_token)
        set_refresh_cookies(resp, refresh_token)
        return resp, 200

    print("\n\nERROR (401): Log in not validated\n\n")
    return {"errors": validation_errors_to_error_messages(form.errors)}


@ user_routes.route("/logout")
def logout():
    '''
    Logs a user out
    '''
    logout_user()
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200


@ user_routes.route("/signup", methods=["POST"])
def sign_up():
    '''
    Creates a new user and logs them in
    '''
    form = SignupForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        user = User(
            firstname=form.data["firstname"],
            lastname=form.data["lastname"],
            username=form.data["username"],
            email=form.data["email"],
            password=form.data["password"]
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}


@user_routes.route("/unauthorized")
def unauthorized():
    '''
    Returns unauthorized JSON when flask-login authentication fails
    '''
    return {"errors": ["Unauthorized"]}, 401


@user_routes.route("/<user_id>")
def getUserInfo(user_id):
    user = User.query.get(int(user_id))
    if user:
        return user.to_dict()
    return {"errors": [f"User of id {user_id} could not be found"]}, 404


'''
----------------------------- User setting routes -----------------------------
'''


# Instances a new setting item for the user, returns user settings, and edits
# depending on the method
@user_routes.route("/settings/<user_id>", methods=["GET", "POST", "PUT"])
def createNewSetting(user_id):
    return {
        "test": f"You have reached {request.method} /users/settings/{user_id}"
    }
