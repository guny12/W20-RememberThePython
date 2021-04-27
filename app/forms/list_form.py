from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import List


def list_exists(form, field):
    title = field.data
    listQuery = List.query.filter(
        List.title == title, List.userId == current_user.id).first()

    if listQuery:
        raise ValidationError(
            'A list with this name already exists. Please try another name.')


class ListForm(FlaskForm):
    title = StringField('List name', validators=[DataRequired(), Length(
        max=100, message='Name must be 100 characters or below.'), list_exists])
