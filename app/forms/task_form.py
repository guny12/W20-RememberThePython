from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, DateField, IntegerField
from wtforms.validators import DataRequired
from app.models import Task


class TaskForm(FlaskForm):
    content = StringField("Task Name", validators=[DataRequired()])
    completed = BooleanField("Completed")
    startDate = DateField("Start Date")
    dueDate = DateField("Due Date")
    priority = IntegerField("Priority")
