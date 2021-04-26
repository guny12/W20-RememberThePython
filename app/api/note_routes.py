from datetime import datetime
from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, List, Task, Note, db

note_routes = Blueprint('note', __name__)


# CREATE A Note
@note_routes.route('/', methods=['POST'])
@login_required
def create_note():
    currentTaskId = request.json['taskId']
    newContent = request.json['content']

    newNote = Note(
        userId=current_user.id,
        taskId=currentTaskId,
        content=newContent
    )

    db.session.add(newNote)
    db.session.commit()

    return {'note': newNote.to_dict()}


# UPDATE A Note
@note_routes.route('/', methods=['PATCH'])
@login_required
def update_note():
    noteId = request.json['noteId']
    content = request.json['content']

    currentNote = Note.query.get(noteId)
    currentNote.content = content
    currentNote.updatedAt = datetime.now()

    db.session.commit()

    return {'note': currentNote.to_dict()}


# DELETE A Note
@note_routes.route('/', methods=['DELETE'])
@login_required
def del_note():
    noteId = request.json['noteId']

    oldNote = Note.query.get(noteId)

    db.session.delete(oldNote)
    db.session.commit()

    return {'message': 'success'}
