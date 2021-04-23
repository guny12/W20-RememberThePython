# API ROUTE FOR TESTING, DELETE AFTER TESTS ARE DONE

from flask import Blueprint, jsonify, redirect
from flask_login import login_required
from app.models import User, List, Task, Note, db

test_routes = Blueprint('test', __name__)


@test_routes.route('/')
def index():
    return '<h1>Hello</h1>'


@test_routes.route('/1')
def add_user():

    return redirect('/')
