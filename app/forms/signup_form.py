from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def email_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


def user_exists(form, field):
    print("Checking if user exits", field.data)
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    firstName = StringField('First name', validators=[DataRequired()])
    lastName = StringField('Last name', validators=[DataRequired()])
    email = StringField('Email', validators=[
        DataRequired(),
        email_exists,
        Email(),
    ])
    username = StringField('Username', validators=[
        DataRequired(),
        user_exists
    ])
    password = StringField('Password', validators=[DataRequired()])
