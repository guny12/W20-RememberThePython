// frontend/src/components/LoginFormModal/index.js
import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import QuickLook from "./QuickLook";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from "../../store/tasks";

function QuickLookModal({ listId }) {
	const [showModal, setShowModal] = useState(false);
	const [isLoaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(taskActions.getListTasks(listId));
			setLoaded(true);
		})();
	}, [dispatch, listId]);

	const tasks = useSelector((state) => state.tasks.allTasks);

	const listTasks = {};
	if (listId > 0) {
		for (const task in tasks) if (tasks[task].listId === listId) listTasks[task] = tasks[task];
	}

	const tasksDiv = listId > 0 ? Object.values(listTasks) : Object.values(tasks);

	if (!isLoaded) return null;
	console.log(tasksDiv, "TASKS DIV");
	return (
		<>
			<Button id="QuickLookButton" className="card-footer-Quicklook" variant="dark" onClick={() => setShowModal(true)}>
				Uncompleted
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<QuickLook tasksDiv={tasksDiv} listId={listId} />
				</Modal>
			)}
		</>
	);
}

export default QuickLookModal;
