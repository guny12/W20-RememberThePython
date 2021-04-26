from datetime import datetime
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, List, Task, Note, db

user_routes = Blueprint('users', __name__)

# # unnecessary(?) route from skeleton
# @user_routes.route('/')
# @login_required
# def users():
#     users = User.query.all()
#     return {"users": [user.to_dict() for user in users]}

# # possible unnecessary(?) route from skeleton
# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     user = User.query.get(id)
#     return user.to_dict()


# GET ALL User ACCOUNT INFORMATION
@user_routes.route('/')
@login_required
def get_user_info():
    userId = current_user.id

    # THIS QUERY WILL JOIN ALL THE TABLES ASSOCIATED WITH
    # THE GIVEN USER, NOT JUST THE LIST TABLE
    # PROPERTIES TO ACCESS TABLE INFO::
    # NOTE::: SEE MODEL ASSOCIATIONS!!!
    # userList
    # userTask
    # userGive
    # userNote
    userInfo = User.query.get(userId)

    # initial "state" of the json object that will be sent
    user = {
        'lists': {},
        'tasks': {},
        'assignedTasks': {},
        'notes': {}
    }

    # THIS IS SO THE userInfo QUERY IS JSON
    # SERIALIZABLE
    for userStuff in userInfo:
        for userList in userStuff.userList:
            user['lists'][userList.id] = userList.to_dict()
        for userTask in userStuff.userTask:
            user['tasks'][userTask.id] = userTask.to_dict()
        for userGive in userStuff.userGive:
            user['assignedTasks'][userGive.id] = userGive.id
        for userNote in userStuff.userNote:
            user['notes'][userNote.id] = userNote.to_dict()

    return {'user': user}


# UPDATE User
@user_routes.route('/', methods=['PATCH'])
@login_required
def update_user():
    if current_user.id == 1:
        return

    userId = current_user.id
    newFirstName = request.json['firstName']
    newLastName = request.json['lastName']
    newEmail = request.json['email']
    newUsername = request.json['username']
    newPassword = request.json['password']

    currentUser = User.query.get(userId)

    if newFirstName:
        currentUser.firstName = newFirstName
    if newLastName:
        currentUser.lastName = newLastName
    if newEmail:
        currentUser.email = newEmail
    if newUsername:
        currentUser.username = newUsername
    if newPassword:
        currentUser.password = newPassword

    currentUser.updatedAt = datetime.now()

    db.session.commit()

    return {'user': currentUser.to_dict()}


# DELETE User
@user_routes.route('/', methods=['DELETE'])
@login_required
def del_user():
    if current_user.id == 1:
        return

    userId = current_user.id
    oldUser = User.query.get(userId)
    db.session.delete(oldUser)
    db.session.commit()

    return {'message': 'success'}
