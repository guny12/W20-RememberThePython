from datetime import datetime
from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, List, Task, Note, db

list_routes = Blueprint('list', __name__)


# IF THERE ARE ANY ISSUES WITH REQUEST BODY, MODIFY
# THE API URL TO PASS INFO IN AS PARAMETERS
# QUERY FOR List DETAILS
@list_routes.route('/')
@login_required
def get_list_info():
    # FETCH BODY EXPECTED TO HAVE listId AS A PROPERTY
    listId = request.json['listId']

    # SEE List MODEL ASSOCIATIONS
    listInfo = db.session.query(List).filter(List.id == listId).first()

    userList = {}

    for task in listInfo.listTask:
        userList[task.id] = task.to_dict()
        userList[task.id]['notes'] = {}
        for note in task.taskNote:
            userList[task.id]['notes'][note.id] = note.to_dict()
            userList[task.id]['notes'][note.id]['username'] = {}
            userList[task.id]['notes'][note.id]['username'] = note.noteUser.username

    return {'list': userList}


# CREATE A NEW List
@list_routes.route('/', methods=['POST'])
@login_required
def create_list():
    newTitle = request.json['title']

    newList = List(
        userId=current_user.id,
        title=newTitle
    )

    db.session.add(newList)
    db.session.commit()

    return {'list': newList.to_dict()}


# UPDATING EXISTING List DETAILS
@list_routes.route('/', methods=['PATCH'])
@login_required
def update_list():
    listId = request.json['listId']
    newTitle = request.json['title']

    currentList = List.query.get(listId)
    currentList.title = newTitle
    currentList.updatedAt = datetime.now()

    db.session.commit()

    return {'list': currentList.to_dict()}


# DELETING A List
@list_routes.route('/', methods=['DELETE'])
@login_required
def del_list():
    # .get() function is essentially 'findByPk()'
    listId = request.json['listId']

    oldList = List.query.get(listId)

    db.session.delete(oldList)
    db.session.commit()

    return {'message': 'success'}
