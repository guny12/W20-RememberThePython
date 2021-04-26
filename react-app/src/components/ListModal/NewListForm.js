import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./ListForm.css";
import { Button, Form } from "react-bootstrap";
import { createList, getAllLists } from "../../store/lists";

const NewListForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [listName, setListName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const submission = {
      title: listName,
      userId: user.id,
    };
    await dispatch(createList(submission));
    dispatch(getAllLists());
    return history.push("/lists");
  };

  return (
    <Form onSubmit={handleSubmit} className="NewListForm__Form">
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Add a list</Form.Label>
        <Form.Text>Please enter a new list name:</Form.Text>
        <Form.Control
          type="text"
          // autoComplete="username"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add
      </Button>
      <Button variant="outline-dark" type="button">
        Cancel
      </Button>
    </Form>
  );
};
export default NewListForm;
