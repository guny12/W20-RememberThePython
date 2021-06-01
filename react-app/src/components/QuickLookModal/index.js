// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import QuickLook from "./QuickLook";
import renderTooltip from "./tooltip";
import { Button, OverlayTrigger } from "react-bootstrap";

function QuickLookModal({ listId }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<OverlayTrigger
				placement="auto"
				delay={{ show: 250, hide: 50 }}
				overlay={renderTooltip}
			>
				<Button id="QuickLookButton" className="card-footer-Quicklook" variant="dark" onClick={() => setShowModal(true)}>
					Uncompleted
				</Button>
			</OverlayTrigger>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<QuickLook listId={listId} />
				</Modal>
			)}
		</>
	);
}

export default QuickLookModal;
