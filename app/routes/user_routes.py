from flask import Blueprint, session, request
from app.models import User, db

from flask_login import current_user, login_user, logout_user, login_required

userroutes = Blueprint("users", __name__)


def validation_errors_to_error_messages(validation_errors):
    '''
    Simple function that turns the WTForms validation errors into a simple list
    '''
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field.title()} : {error}")
        return errorMessages


@user_routes.route("/")
def authenticate():
    '''
    Authenticates a user.
    '''
    if current_user.is_authenticated:
        return current_user.to_dict()
    print("\n\nERROR (401): User not authetnicated \n\n")
    return {"errors": ["Unauthorized"]}


@user_routes.route("/login", methods=["POST"])
def login():
    '''
    Logs a user in
    '''
    form = LoginForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually so validate_on_submit can be used
    form["csrf_token"].data = request.cookies["csrf+token"]
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data["email"]).first()
        login_user(user)
        return user.to_dict()

    print("\n\nERROR (401): Log in not validated\n\n")
    return {"errors": validation_errors_to_error_messages(form.errors)}
