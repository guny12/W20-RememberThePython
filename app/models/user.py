from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from flask_login import UserMixin
from datetime import datetime
from app.models import association_table


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(75), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    hashedPassword = db.Column(db.String(100), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    # associations
    userList = relationship('List', backref='listUser', cascade='all, delete')
    userTask = relationship('Task', backref='taskUser', cascade='all, delete')
    userNote = relationship('Note', backref='noteUser', cascade='all, delete')
    userGive = relationship('Task', secondary=association_table,
                            back_populates='taskGive', cascade='all, delete')

    @property
    def password(self):
        return self.hashedPassword

    @password.setter
    def password(self, password):
        self.hashedPassword = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }
