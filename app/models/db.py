from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    # associations
    listTask = relationship('Task', backref='taskList', cascade="all,delete-orphan")


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    listId = db.Column(db.Integer, db.ForeignKey('lists.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    completed = db.Column(db.Boolean, default=False)
    startDate = db.Column(db.DateTime)
    dueDate = db.Column(db.DateTime)
    #attachmentUrl=db.Column(db.Text)
    priority = db.Column(db.Integer, default=0)
    # min max
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    # associations
    taskNote = relationship('Note', backref='noteTask', cascade="all,delete-orphan")



class GiveToUser(db.Model):
    __tablename__ = 'giveToUsers'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    taskId = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)

    # associations
    # TEST THE CASCADE DELETE. remove the cascade if it breaks
    giveUser = relationship('User', backref=db.backref('giveUserTask'), cascade="all,delete-orphan")
    giveTask = relationship('Task', backref=db.backref('giveTaskUser'), cascade="all,delete-orphan")


class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    taskId = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())
