from flask import Blueprint, session, request
from flask_login import login_required
from app.models import List, db
from app.forms.List_form import ListForm

list_routes = Blueprint("lists", __name__)


@list_routes.route("/")
# @login_required
def all_list():
    lists = List.query.all()
    return {"lists": [lis.to_dict() for lis in lists]}


@list_routes.route("/", methods=["POST"])
# @login_required
def create_list():
    form = ListForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        li = List(title=form.title.data, userId=form.userId.data)
        db.session.add(li)
        db.session.commit()
        return li.to_dict()
    else:
        return {"errors": "No name entered. Please choose a name."}
