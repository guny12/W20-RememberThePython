from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, List, Task, Note, db

search_routes = Blueprint('search', __name__)


@search_routes.route('/<string:query>')
@login_required
def get_search_results(query):
    userId = current_user.id

    # NOTE ilike PROPERTY, CASE INSENSITIVE
    taskResults = Task.query.filter(
        Task.creatorId == userId, Task.content.ilike(f'%{query}%')).all()

    listResults = List.query.filter(
        List.userId == userId, List.title.ilike(f'%{query}%')).all()

    results = {
        'taskResults': {},
        'listResults': {}
    }

    for result in taskResults:
        results['taskResults'][result.id] = result.to_dict()

    for result in listResults:
        results['listResults'][result.id] = result.to_dict()

    return {'results': results}
