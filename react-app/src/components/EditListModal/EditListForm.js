import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { editList, getAllLists } from "../../store/lists";
import './EditList.css'

const EditListForm = (id) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [listName, setListName] = useState(id.title);
  const close = document.querySelector("#modal-background");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const submission = {
      title: listName,
      listId: id.id,
    };
    await dispatch(editList(submission))
    dispatch(getAllLists());
    close.click();
    return history.push("/lists");
  };

  const handleCancel = (e) => {
    const closed = document.querySelector("#modal-background");
    e.preventDefault();
    closed.click();
  };

  return (
    <Form onSubmit={handleSubmit} className="NewListForm__Form">
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
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
      {listName !== id.title? <Button variant="primary" type="submit">
        Save
      </Button> : ''}
      <Button variant="outline-dark" type="button" onClick={handleCancel}>
        Cancel
      </Button>
    </Form>
  );
};
export default EditListForm;
