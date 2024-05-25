import json

from flask import Flask, request, jsonify, Response, make_response
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required
from flask_restx import Resource, fields, Namespace
from werkzeug.security import generate_password_hash, check_password_hash
from models import User

auth_ns = Namespace('auth', description='A namespace for our authentication')

signup_model = auth_ns.model(
    "SignUp",
    {
        "first_name": fields.String(required=True),
        "last_name": fields.String(required=True),
        "email": fields.String(required=True),
        "password": fields.String(required=True)
    }
)

login_model = auth_ns.model(
    "Login",
    {
        "email": fields.String(required=True),
        "password": fields.String(required=True)
    }
)


@auth_ns.route('/signup')
class SignUp(Resource):
    @auth_ns.expect(signup_model)
    def post(self):
        data = request.get_json()
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')

        # Check if user with the provided email already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            # Log that the user already exists
            print("User with email {} already exists.".format(email))
            return jsonify({"message": "User with this email already exists"})

        # Creating a new user
        new_user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=generate_password_hash(password)
        )

        # Save the new user to the database
        new_user.save()

        return make_response(jsonify({"message": "User created successfully"}), 201)


@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Retrieve user ID based on email
        user_id = User.query.filter_by(email=email).first()

        if user_id and check_password_hash(user_id.password, password):
            access_token = create_access_token(identity=user_id.id)
            refresh_token = create_refresh_token(identity=user_id.id)
            response_data = {"access_token": access_token, "refresh_token": refresh_token}
            return make_response(jsonify(response_data), 200)
        else:
            return make_response(jsonify({"message": "Invalid email or password"}), 401)

@auth_ns.route('/refresh')
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
