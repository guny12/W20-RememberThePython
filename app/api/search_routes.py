from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, List, Task, Note, db

# from datetime import datetime, timedelta
import datetime

search_routes = Blueprint("search", __name__)


@search_routes.route("/<string:query>")
@login_required
def get_search_results(query):
    userId = current_user.id

    # NOTE ilike PROPERTY, CASE INSENSITIVE
    taskResults = Task.query.filter(Task.creatorId == userId, Task.content.ilike(f"%{query}%")).all()

    listResults = List.query.filter(List.userId == userId, List.title.ilike(f"%{query}%")).all()

    results = {"taskResults": {}, "listResults": {}}

    for result in taskResults:
        results["taskResults"][result.id] = result.to_dict()

    for result in listResults:
        results["listResults"][result.id] = result.to_dict()

    return {"results": results}


@search_routes.route("/date/<string:query>")
@login_required
def get_searchDate_results(query):
    userId = current_user.id

    today = datetime.datetime.now()
    Today = today.strftime("%Y-%m-%d 00:00:00")

    if query == "Today":
        taskResults = Task.query.filter(Task.creatorId == userId, Task.dueDate == Today).all()
    elif query == "Tomorrow":
        tomorrow = today + datetime.timedelta(days=1)
        tomorrow = tomorrow.strftime("%Y-%m-%d 00:00:00")
        taskResults = Task.query.filter(Task.creatorId == userId, Task.dueDate == tomorrow).all()
    elif query == "ThisWeek":
        endOfWeek = today + datetime.timedelta(days=7)
        endOfWeek = endOfWeek.strftime("%Y-%m-%d 00:00:00")
        taskResults = Task.query.filter(
            Task.creatorId == userId, Task.dueDate >= Today, Task.dueDate <= endOfWeek
        ).all()

    results = {"taskResults": {}}

    for result in taskResults:
        results["taskResults"][result.id] = result.to_dict()

    return {"results": results}
