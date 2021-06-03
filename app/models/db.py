from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()


giveToUser = db.Table(
    "givetousers",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("task_id", db.Integer, db.ForeignKey("tasks.id")),
)


class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(75), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    hashedPassword = db.Column(db.String(100), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    # associations
    userList = relationship("List", backref="listUser", cascade="all, delete")
    userTask = relationship("Task", backref="taskUser", cascade="all, delete")
    userNote = relationship("Note", backref="noteUser", cascade="all, delete")
    userGive = relationship("Task", secondary=giveToUser,
                            back_populates="taskGive", cascade="all, delete")

    @property
    def password(self):
        return self.hashedPassword

    @password.setter
    def password(self, password):
        self.hashedPassword = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {"id": self.id, "username": self.username, "email": self.email}


class List(db.Model):
    __tablename__ = "lists"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    # associations
    listTask = relationship("Task", backref="taskList", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "title": self.title,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
            "numTasks": len(self.listTask),
            "numCompleted": len([task.to_dict() for task in self.listTask if task.completed == True])
        }


class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    listId = db.Column(db.Integer, db.ForeignKey("lists.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    completed = db.Column(db.Boolean, default=False)
    startDate = db.Column(db.DateTime)
    dueDate = db.Column(db.DateTime)
    # attachmentUrl=db.Column(db.Text)
    priority = db.Column(db.Integer, default=0)
    # min max
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    # associations
    taskNote = relationship("Note", backref="noteTask", cascade="all, delete")
    taskGive = relationship("User", secondary=giveToUser,
                            back_populates="userGive")

    def to_dict(self):
        return {
            "id": self.id,
            "creatorId": self.creatorId,
            "listId": self.listId,
            "content": self.content,
            "completed": self.completed,
            "startDate": self.startDate,
            "dueDate": self.dueDate,
            "priority": self.priority,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }


class Note(db.Model):
    __tablename__ = "notes"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    taskId = db.Column(db.Integer, db.ForeignKey("tasks.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "taskId": self.taskId,
            "content": self.content,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
