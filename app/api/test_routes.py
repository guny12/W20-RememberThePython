# API ROUTE FOR TESTING, DELETE AFTER TESTS ARE DONE
from datetime import datetime
from flask import Blueprint, jsonify, redirect
from flask_login import login_required
from faker import Faker
from app.models import User, List, Task, Note, db, giveToUser

faker = Faker()
test_routes = Blueprint('test', __name__)


@test_routes.route('/')
def index():
    return '<h1>Hello</h1>'


# DELETE API ROUTEEEESSSSSSSSSSSSSSS-----------------------
# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# DELETE USER WORKS (may require more testing?)
@test_routes.route('/1asdfasgwrgeag', methods=['DELETE'])
def del_user():
    oldUser = User.query.filter(User.username == 'demolition').first()
    db.session.delete(oldUser)
    db.session.commit()

    return redirect('/api/test')


# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# DELETE LIST WORKS (so far?)
@test_routes.route('/woikjgoeaieghoih', methods=['DELETE'])
def del_list():
    # .get() function is essentially 'findByPk()'
    oldList = List.query.get(73)
    db.session.delete(oldList)
    db.session.commit()

    return redirect('/api/test')


# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# DELETE TASK WORKS (???)
@test_routes.route('/oihjg9348h84hg', methods=['DELETE'])
def del_task():
    oldTask = Task.query.get(4)
    db.session.delete(oldTask)
    db.session.commit()

    return redirect('/api/test')


# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# PRETTY SURE DELETE NOTE WORKS (I mean it's just one thing, come on now)
@test_routes.route('/lakjgao8h84hg', methods=['DELETE'])
def del_note():
    oldNote = Note.query.get(7)
    db.session.delete(oldNote)
    db.session.commit()

    return redirect('/api/test')
# DELETE API ROUTEEEESSSSSSSSSSSSSSS-----------------------


# CREATE API ROUTESSSSSSSSSSSSSSSS-------------------------
# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# YAY CREATING A LIST WORKS
@test_routes.route('/oi54j03hj08h55h', methods=['POST'])
def create_list():
    newList = List(
        userId=1,
        title='oiwejgi234ho3i4hyoi'
    )
    db.session.add(newList)
    db.session.commit()

    return redirect('/api/test')


# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# YAY CREATING A TASK WORKS
@test_routes.route('/a34tg3w4heh3hrtth', methods=['POST'])
def create_task():
    newTask = Task(
        creatorId=1,
        listId=1,
        content='get a job'
    )
    db.session.add(newTask)
    db.session.commit()

    return redirect('/api/test')


@test_routes.route('/agerh534h45jhrjsrtjsrj', methods=['POST'])
def create_note():
    newNote = Note(
        userId=1,
        taskId=1,
        content='wow sqlalchemy is so much nicer than sequelize'
    )
    db.session.add(newNote)
    db.session.commit()

    return redirect('/api/test')


# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# YAY GIVING A TASK TO A USER WORKS (maybe???)
# AVOID DUPLICATE ROWS PLS
@test_routes.route('/drj56ir67oiko867lk', methods=['POST'])
def give_to_user():
    assignedUser = 2
    taskId = 7

    # this is raw sql because a table cannot
    # be interacted with the same way as a
    # model
    db.session.execute(f'''INSERT INTO givetousers (user_id, task_id)
    VALUES ({assignedUser}, {taskId});''')
    db.session.commit()

    return redirect('/api/test')
# CREATE API ROUTESSSSSSSSSSSSSSSS-------------------------


# UPDATE API ROUTEEEEESSSSSSSSSSSSSSS----------------------
# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# UPDATING USER INFO WORKS YAYY
@test_routes.route('/fgndfh56u65rusrhj', methods=['PATCH'])
def update_user():
    userId = 1
    newFirstName = 'test'
    newLastName = 'test'
    newEmail = 'test@testing.com'
    newUsername = 'tester1324'
    newPassword = 'password123'

    currentUser = User.query.get(1)

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

    return redirect('/api/test')


# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# UPDATING LIST TITLE WORKS YAYY
@test_routes.route('/r6ut7of6t7o6y7logyulk', methods=['PATCH'])
def update_list():
    listId = 1
    currentList = List.query.get(listId)
    currentList.title = 'here\'s all ur tasks...'
    currentList.updatedAt = datetime.now()
    db.session.commit()

    return redirect('/api/test')


# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# UPDATING TASK INFO WORKS (haven't tested the assigning part yet sorry!) YAYY
@test_routes.route('/eh45hj4e56j', methods=['PATCH'])
def update_task():
    # newUserId for adding a user to a task
    # can be 0 to signify no new user is being added
    # to a task
    newUserId = 1

    # assignedUserId for determining if task owner
    # would like to unassign task from currently
    # assigned user
    assignedUserId = 4

    taskId = 1
    userId = 2
    content = 'buy milk. almond milk.'
    completed = True
    startDate = datetime.now()
    dueDate = datetime.now()
    priority = 3
    currentTask = Task.query.get(taskId)

    if content:
        currentTask.content = content
    if completed is not None:
        currentTask.completed = completed
    if startDate:
        currentTask.startDate = startDate
    if dueDate:
        currentTask.dueDate = dueDate
    if priority:
        currentTask.priority = priority
    if assignedUserId > 0 and newUserId == 0:
        # unassigning task from currently assigned user
        db.session.execute(f'''DELETE FROM givetousers
        WHERE user_id={assignedUserId} AND task_id={taskId};''')
    if assignedUserId > 0 and newUserId > 0:
        # assigning task to a new user
        db.session.execute(f'''INSERT INTO givetousers (user_id, task_id)
        VALUES ({newUserId}, {taskId});''')

    currentTask.updatedAt = datetime.now()
    db.session.commit()

    return redirect('/api/test')


# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# UPDATING NOTE CONTENT WORKS YAYY
@test_routes.route('/ashge5rh34hws3e5h', methods=['PATCH'])
def update_note():
    noteId = 1
    content = 'is almond milk TRULY milk????'
    currentNote = Note.query.get(noteId)
    currentNote.content = content
    currentNote.updatedAt = datetime.now()
    db.session.commit()

    return redirect('/api/test')
# UPDATE API ROUTEEEEESSSSSSSSSSSSSSS----------------------


# READ API ROUTEEEESSSSSSSSSSSSSSSSS-----------------------
# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# QUERYING FOR ALL RELEVANT USER INFO FUNCTIONAL HOORAY
@test_routes.route('/56ij56kje56kjek')
def get_user_info():
    userId = 1

    # THIS QUERY WILL JOIN ALL THE TABLES ASSOCIATED WITH
    # THE GIVEN USER, NOT JUST THE LIST TABLE
    # PROPERTIES TO ACCESS TABLE INFO::
    # NOTE::: SEE MODEL ASSOCIATIONS!!!
    # userList
    # userTask
    # userGive
    # userNote
    userInfo = db.session.query(User).join(
        List).filter(List.userId == userId).all()

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

    return user


# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# QUERYING FOR ALL RELEVANT LIST INFO FUNCTIONAL HOORAY
@test_routes.route('/g5hg9548hg9h5g')
def get_list_info():
    listId = 1

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

    return userList


# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# QUERYING FOR ALL RELEVANT LIST INFO FUNCTIONAL HOORAY
@test_routes.route('/458h9584hj98hjh8h')
def get_task_info():
    taskId = 1

    # WOW I LOVE SQLALCHEMY
    # ASSOCIATIONS ARE ALREADY INCLUDE
    # WITH A SIMPLE QUERY LIKE THIS
    taskInfo = Task.query.get(taskId)

    task = taskInfo.to_dict()
    task['notes'] = {}

    for note in taskInfo.taskNote:
        task['notes'][note.id] = note.to_dict()
        task['notes'][note.id]['username'] = {}
        task['notes'][note.id]['username'] = note.noteUser.username

    return task


# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# SEARCH FUNCTIONAL HOORAY
@test_routes.route('/1/<int:userId>/<string:query>')
def get_search_results(userId, query):
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

    return results
# READ API ROUTEEEESSSSSSSSSSSSSSSSS-----------------------
