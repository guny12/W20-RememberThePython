// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import QuickLook from "./QuickLook";
import { Button } from "react-bootstrap";

function QuickLookModal({ listId }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button id="QuickLookButton" className="card-footer-Quicklook" variant="dark" onClick={() => setShowModal(true)}>
				Quick Look
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<QuickLook listId={listId} />
				</Modal>
			)}
		</>
	);
}

export default QuickLookModal;
