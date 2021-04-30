from datetime import datetime
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, List, Task, Note, db
from app.forms.task_form import TaskForm
from . import validation_errors_to_error_messages

task_routes = Blueprint("task", __name__)


# GET Single Task
@task_routes.route("/")
@login_required
def get_task_info():
    taskId = request.json["taskId"]
    taskInfo = Task.query.get(taskId)

    task = taskInfo.to_dict()
    task["notes"] = {}

    for note in taskInfo.taskNote:
        task["notes"][note.id] = note.to_dict()
        task["notes"][note.id]["username"] = {}
        task["notes"][note.id]["username"] = note.noteUser.username

    return {"task": task}


# GET All Tasks
@task_routes.route("/all")
@login_required
def get_all_tasks():
    userId = current_user.id
    tasks = Task.query.filter(Task.creatorId == userId).order_by(Task.createdAt).all()
    return {"tasks": [task.to_dict() for task in tasks]}


# GET ALL Tasks FROM GIVEN listId
@task_routes.route("/<int:listId>/all")
@login_required
def get_all_list_tasks(listId):
    userId = current_user.id

    tasks = Task.query.filter(Task.creatorId == userId, Task.listId == listId).order_by(Task.createdAt).all()

    return {"tasks": [task.to_dict() for task in tasks]}


# CREATE Task
@task_routes.route("/", methods=["POST"])
@login_required
def create_task():
    form = TaskForm()

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        body = request.json
        currentListId = request.json["listId"]
        targetList = List.query.get(currentListId)
        if targetList.userId != current_user.id:
            return {"errors": "Must be List creator to create a Task there"}, 401
        newContent = body["content"]
        newCompleted = body["completed"] if "completed" in body else ""
        newStartDate = body["startDate"] if "startDate" in body else ""
        newDueDate = body["dueDate"] if "dueDate" in body else ""
        newPriority = body["priority"] if "priority" in body else ""

        newTask = Task(
            creatorId=current_user.id,
            listId=currentListId,
            content=newContent,
            # completed=newCompleted,
            # startDate=newStartDate,
            # dueDate=newDueDate,
            # priority=newPriority,
        )

        db.session.add(newTask)
        db.session.commit()

        return {"task": newTask.to_dict()}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# UPDATE Task
@task_routes.route("/", methods=["PATCH"])
@login_required
def update_task():
    form = TaskForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():

        # newUserId for adding a user to a task
        # can be 0 to signify no new user is being added
        # to a task
        # newUserId = request.json["newUserId"]

        # assignedUserId for determining if task owner
        # would like to unassign task from currently
        # assigned user
        # assignedUserId = request.json["assignedUserId"]

        userId = current_user.id
        taskId = request.json["taskId"]
        content = request.json["content"]
        dueDate = request.json["dueDate"]
        listId = request.json["listId"]
        # completed = request.json["completed"]
        # startDate = request.json["startDate"]
        # priority = request.json["priority"]
        print("WE ARE IN THE BACKEND ROUTE!!!!")

        print(userId, taskId, content, dueDate, "OTHER STUFFF")


        print(userId, taskId, content, dueDate, "OTHER OTHER STUFFF")
        print(listId, "LIST ID!!!")

        currentTask = Task.query.get(taskId)

        if content:
            currentTask.content = content
        # if completed is not None:
        #     currentTask.completed = completed
        # if startDate:
        #     currentTask.startDate = startDate
        if dueDate:
            currentTask.dueDate = dueDate
        if listId:
            currentTask.listId = listId
        # if priority:
        #     currentTask.priority = priority
        # if assignedUserId > 0 and newUserId == 0:
        #     # unassigning task from currently assigned user
        #     db.session.execute(
        #         f"""DELETE FROM givetousers
        #     WHERE user_id={assignedUserId} AND task_id={taskId};"""
        #     )
        # if assignedUserId > 0 and newUserId > 0:
        #     # assigning task to a new user
        #     db.session.execute(
        #         f"""INSERT INTO givetousers (user_id, task_id)
        #     VALUES ({newUserId}, {taskId});"""
        #     )

        currentTask.updatedAt = datetime.now()

        db.session.commit()

        return {"task": currentTask.to_dict()}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# DELETE Task
@task_routes.route("/", methods=["DELETE"])
@login_required
def del_task():
    taskId = request.json["taskId"]
    oldTask = Task.query.get(taskId)

    if oldTask.creatorId != current_user.id:
        return {"errors": "Must be Task creator to delete a Task"}, 401

    db.session.delete(oldTask)
    db.session.commit()
    return {"message": "Task deleted", "listId": oldTask.listId}
