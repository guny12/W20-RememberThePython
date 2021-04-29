from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, DateField, IntegerField
from wtforms.validators import DataRequired
from app.models import Task


class TaskForm(FlaskForm):
    content = StringField("content", validators=[DataRequired()])
    completed = BooleanField("completed", default=False)
    # startDate = DateField("startDate", default="")
    # dueDate = DateField("dueDate", default="")
    # priority = IntegerField("priority", default="")
