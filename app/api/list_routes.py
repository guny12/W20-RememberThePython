from datetime import datetime
from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import List, db
from app.forms.list_form import ListForm

list_routes = Blueprint("lists", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

@list_routes.route("/")
# @login_required
def all_list():
    userId = current_user.id
    lists = List.query.filter(List.userId == userId).order_by(List.id).all()
    return {"lists": [lis.to_dict() for lis in lists]}


@list_routes.route("/", methods=["POST"])
# @login_required
def create_list():
    form = ListForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        li = List(title=form.title.data, userId=current_user.id)
        db.session.add(li)
        db.session.commit()
        return li.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# UPDATING EXISTING List DETAILS
@list_routes.route('/', methods=['PATCH'])
@login_required
def update_list():
    userId = current_user.id
    listId = request.json['listId']
    newTitle = request.json['title']

    currentList = List.query.get(listId)
    if currentList.userId != userId:
        return {'list': 'You are not the owner of this list item'}
    currentList.title = newTitle
    currentList.updatedAt = datetime.now()

    db.session.commit()

    return {'list': currentList.to_dict()}

# # DELETING A List
@list_routes.route('/', methods=['DELETE'])
@login_required
def del_list():
    # .get() function is essentially 'findByPk()'
    userId = current_user.id
    listId = request.json['listId']

    oldList = List.query.get(listId)
    if oldList.userId != userId:
        return {'list': 'You are not the owner of this list item'}
    db.session.delete(oldList)
    db.session.commit()

    return {'message': 'success'}
# =----------------------------------------------------------------------------------------------------

# # IF THERE ARE ANY ISSUES WITH REQUEST BODY, MODIFY
# # THE API URL TO PASS INFO IN AS PARAMETERS
# # QUERY FOR List DETAILS
# @list_routes.route('/')
# @login_required
# def get_list_info():
#     # FETCH BODY EXPECTED TO HAVE listId AS A PROPERTY
#     listId = request.json['listId']
#     print(listId, "LIST ID---------------------------")
#     # SEE List MODEL ASSOCIATIONS
#     listInfo = db.session.query(List).filter(List.id == listId).first()

#     userList = {}

#     for task in listInfo.listTask:
#         userList[task.id] = task.to_dict()
#         userList[task.id]['notes'] = {}
#         for note in task.taskNote:
#             userList[task.id]['notes'][note.id] = note.to_dict()
#             userList[task.id]['notes'][note.id]['username'] = {}
#             userList[task.id]['notes'][note.id]['username'] = note.noteUser.username

#     return {'list': userList}
