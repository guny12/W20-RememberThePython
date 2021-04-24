// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import { Button } from "react-bootstrap";

function LoginFormModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button id="loginButton" variant="dark" onClick={() => setShowModal(true)}>
				Log In
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<LoginForm />
				</Modal>
			)}
		</>
	);
}

export default LoginFormModal;
