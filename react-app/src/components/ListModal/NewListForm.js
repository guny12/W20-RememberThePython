import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { createList, getAllLists } from "../../store/lists";
import styles from "./ListForm.module.css";
import "./ListForm.css";

const NewListForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);
	const [listName, setListName] = useState("");
	const close = document.querySelector("#modal-background");

	const handleSubmit = async (e) => {
		e.preventDefault();
		let newErrors = [];
		const submission = {
			title: listName,
			userId: user.id,
		};
		const data = await dispatch(createList(submission));
		if (data.errors) {
			newErrors = data.errors;
			setErrors([newErrors[0].split(":")[1]]);
		} else {
			await dispatch(getAllLists());
			close.click();
			document.querySelector(`#sideNav-tab-${data.id}`).click();
		}
	};
	const handleCancel = (e) => {
		const closed = document.querySelector("#modal-background");
		e.preventDefault();
		closed.click();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Add a list</Form.Label>
				<Form.Text className={styles.form_text}>Please enter a new list name:</Form.Text>
				<Form.Control
					type="text"
					value={listName}
					maxLength="100"
					onChange={(e) => setListName(e.target.value)}
					required
				/>
			</Form.Group>
			<div className={styles.div_error}>
				{errors.map((error, idx) => (
					<p key={idx}>{error}</p>
				))}
			</div>
			<Button variant="primary" type="submit">
				Add
			</Button>
			<Button variant="outline-dark" type="button" onClick={handleCancel}>
				Cancel
			</Button>
		</Form>
	);
};
export default NewListForm;
