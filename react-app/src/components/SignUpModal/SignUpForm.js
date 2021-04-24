import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./SignUpForm.css";
import { Button, Form } from "react-bootstrap";

const SignUpForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const close = document.querySelector("#modal-background");

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);

			const response = await dispatch(sessionActions.signUp({ email, username, password, firstName, lastName }));
			if (response.errors) return setErrors(response.errors);
			history.push("/home");
			close.click();
			return;
		} else {
			return setErrors(["Confirm Password field must be the same as the Password field"]);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Email </Form.Label>
				<Form.Control
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					placeholder="Enter Email"
				/>
			</Form.Group>
			<Form.Group controlId="formBasicUsername">
				<Form.Label>Username </Form.Label>
				<Form.Control
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					placeholder="Enter Username"
				/>
			</Form.Group>
			<Form.Group controlId="formBasicFirstName">
				<Form.Label>First Name</Form.Label>
				<Form.Control
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
					placeholder="Enter First Name"
				/>
			</Form.Group>
			<Form.Group controlId="formBasicLastName">
				<Form.Label>Last Name</Form.Label>
				<Form.Control
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
					placeholder="Enter Last Name"
				/>
			</Form.Group>
			<Form.Group controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					placeholder="Enter your password"
				/>
				<Form.Label>Confirm Password </Form.Label>
				<Form.Control
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					placeholder="Confirm Your Password"
					required
				/>
			</Form.Group>
			<Button type="submit">Sign Up</Button>
		</Form>
	);
};

export default SignUpForm;
