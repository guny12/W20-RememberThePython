import React from "react";
import { useDispatch, useSelector } from "react-redux";

import * as checkboxActions from "../../store/checkboxes";
import * as taskActions from "../../store/tasks";

function EditTasks({ listId }) {
  const dispatch = useDispatch();
  const listAllTasks = useSelector((state) => state.tasks.allTasks);
  const listAllTaskResults = useSelector((state) => state.search.results);
  const parentCheckbox = useSelector((state) => state.checkboxes.parentCheckbox);

  const taskSelect = async (e) => {
    await dispatch(checkboxActions.primaryCheckbox(e.target.value));

    let currentList;

    if (listId === -1) {
      currentList = listAllTaskResults.taskResults;
    } else {
      currentList = listAllTasks;
    }

    if (parentCheckbox.checked) {
      for (const key in currentList) {
        await dispatch(taskActions.checkTask(key));
      }
    } else {
      for (const key in currentList) {
        await dispatch(taskActions.uncheckATask(key));
      }
    }
  };

  return (
    <div className="edit-container">
      <input
        type="checkbox"
        className={`master-checkbox master-checkbox-listId-${listId}`}
        value={listId}
        onClick={(e) => taskSelect(e)}
      />
      <button>
        <i className="fas fa-check"></i>
      </button>
      <button>
        <i className="fas fa-exclamation-circle"></i>
      </button>
      <button>
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
}

export default EditTasks;
