from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ListForm(FlaskForm):
    title = StringField("Name", validators=[DataRequired()])
    userId = IntegerField("User Id", validators=[DataRequired()])
