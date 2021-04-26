from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exists", field.data)
    credential = field.data
    user = User.query.filter(User.email == credential).first()

    if not user:
        user = User.query.filter(User.username == credential).first()
        if not user:
            raise ValidationError("Invalid Credentials.")


def password_matches(form, field):
    print("Checking if password matches")
    password = field.data
    credential = form.data['credential']
    user = User.query.filter(User.email == credential).first()

    if not user:
        user = User.query.filter(User.username == credential).first()
        if not user:
            raise ValidationError("Invalid Credentials.")
    if not user.check_password(password):
        raise ValidationError("Invalid Credentials.")


class LoginForm(FlaskForm):
    credential = StringField('Email / Username', validators=[
        DataRequired(),
        user_exists
    ])
    password = StringField('Password', validators=[
                           DataRequired(),
                           password_matches
                           ])
