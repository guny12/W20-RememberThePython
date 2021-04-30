import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as taskActions from "../../store/tasks";
import * as listActions from "../../store/lists";

function AddTask({ listId }) {
	const dispatch = useDispatch();
	const [content, setContent] = useState("");
	const [inputSelected, setInputSelected] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = {
			content,
			listId,
		};
		setContent("");
		await dispatch(taskActions.newTask(payload));
		// await dispatch(listActions.getAllLists());
	};

  const focusMethod = () => {
    document.getElementById("add-task-id").focus()
    if (!inputSelected) setInputSelected(true)
  }

  // onClick to anywhere on the DOM other than input field
  // if (inputSelected) setInputSelected(false)

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="add-task-id"
        type="text"
        placeholder="Add a task..."
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onClick={(e) => focusMethod()}
      ></input>
      {inputSelected &&
        <button type="submit">Add Task</button>
      }
  </form>
  );
}

export default AddTask;
