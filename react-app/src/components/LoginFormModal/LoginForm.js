import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { Button, Form } from "react-bootstrap";

const LoginForm = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const data = await dispatch(sessionActions.login({ credential, password }));
		if (data.errors) {
			setErrors(data.errors);
		}
	};

	return (
		<Form onSubmit={handleSubmit} className="loginform__Form">
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Username or Email</Form.Label>
				<Form.Control
					type="text"
					autoComplete="username"
					value={credential}
					onChange={(e) => setCredential(e.target.value)}
					required
					placeholder="Enter Username or Email"
				/>
			</Form.Group>
			<Form.Group controlId="formGroupPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					placeholder="Enter Password"
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Log In
			</Button>
		</Form>
	);
};
export default LoginForm;
