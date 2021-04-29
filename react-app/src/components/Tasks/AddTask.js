import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as taskActions from "../../store/tasks";
import * as listActions from "../../store/lists";

function AddTask({ listId }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
	const [inputSelected, setInputSelected] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      content,
      listId,
    };
    setContent("");
    await dispatch(taskActions.newTask(payload));
    await dispatch(listActions.getAllLists());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task..."
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onClick={(e) => setInputSelected(!inputSelected)}
      ></input>
      {inputSelected &&
        <button type="submit">Add Task</button>
      }
  </form>
  );
}

export default AddTask;
