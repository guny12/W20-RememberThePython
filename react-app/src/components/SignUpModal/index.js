import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";
import { Button } from "react-bootstrap";

function SignUpModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button variant="dark" onClick={() => setShowModal(true)}>
				Sign Up
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<SignUpForm />
				</Modal>
			)}
		</>
	);
}

export default SignUpModal;
