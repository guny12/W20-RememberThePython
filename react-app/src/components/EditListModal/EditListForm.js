import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { editList, getAllLists } from "../../store/lists";
import styles from "./EditList.module.css";
import "./EditList.css";

const EditListForm = (id) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [errors, setErrors] = useState([]);
	const [listName, setListName] = useState(id.title);
	const close = document.querySelector("#modal-background");

	const allLists = useSelector((state) => {
		return state.lists.allLists;
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		let newError;
		allLists.map((list) => {
			if (list.title === listName) {
				newError = ["You already have a list with this name. Please choose another name."];
			}
			return newError;
		});
		console.log(newError);
		if (newError) {
			setErrors(newError);
		} else {
			const submission = {
				title: listName,
				listId: id.id,
			};
			await dispatch(editList(submission));
			dispatch(getAllLists());
			close.click();
			return history.push("/lists");
		}
	};

	const handleCancel = (e) => {
		const closed = document.querySelector("#modal-background");
		e.preventDefault();
		closed.click();
	};

	return (
		<Form onSubmit={handleSubmit} className="NewListForm__Form">
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Rename list</Form.Label>
				<Form.Text>List name</Form.Text>
				<Form.Control
					type="text"
					maxLength="100"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
					required
				/>
			</Form.Group>
			<div className={styles.div_error}>
				{errors.map((error, idx) => (
					<p key={idx}>{error}</p>
				))}
			</div>
			{listName !== id.title ? (
				<Button variant="primary" type="submit">
					Save
				</Button>
			) : (
				""
			)}
			<Button variant="outline-dark" type="button" onClick={handleCancel}>
				Cancel
			</Button>
		</Form>
	);
};
export default EditListForm;
