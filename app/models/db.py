from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()


# class User(db.Model):
#     __tablename__ = 'users'

#     id = db.Column(db.Integer, primary_key=True)
#     firstName = db.Column(db.String(50), nullable=False)
#     lastName = db.Column(db.String(50), nullable=False)
#     email = db.Column(db.String(75), unique=True, nullable=False)
#     username = db.Column(db.String(50), unique=True, nullable=False)
#     hashedPassword = db.Column(db.String(100), nullable=False)
#     createdAt = db.Column(db.DateTime, default=datetime.now())
#     updatedAt = db.Column(db.DateTime, default=datetime.now())

#     # associations
#     userList = relationship('List', backref='listUser')
#     userTask = relationship('Task', backref='taskUser')
#     userNote = relationship('Note', backref='noteUser')

#     @property
#     def password(self):
#         return self.hashedPassword

#     @password.setter
#     def password(self, password):
#         self.hashedPassword = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password, password)


class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    # associations
    listTask = relationship('Task', backref='taskList')


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    listId = db.Column(db.Integer, db.ForeignKey('lists.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    completed = db.Column(db.Boolean, default=False)
    startDate = db.Column(db.DateTime)
    dueDate = db.Column(db.DateTime)
    priority = db.Column(db.Integer)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    # associations
    taskNote = relationship('Note', backref='noteTask')


class GiveToUser(db.Model):
    __tablename__ = 'giveToUsers'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    taskId = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)

    # associations
    giveUser = relationship('User', backref=db.backref('giveUserTask'))
    giveTask = relationship('Task', backref=db.backref('giveTaskUser'))


class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    taskId = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())
