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
# REASSIGNING TASK WORKS (I think??) YAYY
@test_routes.route('/1')
def reassign_task():
    userId = 6
    taskId = 6
    newUserId = 13

    db.session.execute(f'''UPDATE givetousers
    SET user_id={newUserId}
    WHERE user_id={userId} AND task_id={taskId};''')
    db.session.commit()

    return redirect('/api/test')


# ROUTE WORKS, CHANGE CODE ACCORDINGLY
# UPDATING TASK INFO WORKS YAYY
@test_routes.route('/eh45hj4e56j', methods=['PATCH'])
def update_task():
    taskId = 1
    userId = 2
    taskId = 2
    newUserId = 1
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
    if newUserId == -1:
        # raw sql just because dealing with tables (NOT MODELS)
        # is a headache and I've been reading too much docs
        db.session.execute(f'''DELETE FROM givetousers
        WHERE user_id={userId} AND task_id={taskId};''')
    # if newUserId

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
