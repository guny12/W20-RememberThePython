from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Task


class TaskForm(FlaskForm):
    content = StringField('Task Name', validators=[DataRequired()])
