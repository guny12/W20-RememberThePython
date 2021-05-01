import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as checkboxActions from "../../store/checkboxes";
import * as taskActions from "../../store/tasks";

function EditTasks({ listId }) {
  const dispatch = useDispatch();
  const listAllTasks = useSelector((state) => state.tasks.allTasks);
  const checkedTasks = useSelector((state) => state.tasks.checkedTasks);
  const listAllTaskResults = useSelector((state) => state.search.results);
  const parentCheckbox = useSelector((state) => state.checkboxes.parentCheckbox);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (parentCheckbox.currentListId === null) {
      setIsChecked(false);
    }
  }, [parentCheckbox.currentListId]);

  const taskSelect = async (e) => {
    await dispatch(checkboxActions.primaryCheckbox(e.target.value));

    let currentList;

    if (listId === -1) {
      currentList = listAllTaskResults.taskResults;
    } else {
      currentList = listAllTasks;
    }

    if (parentCheckbox.checked) {
      setIsChecked(true);
      // await dispatch(taskActions.bulkCheckTask(currentList));
      for (const key in currentList) {
        await dispatch(taskActions.checkTask(key));
      }
      document.querySelectorAll(".task-checkbox").forEach((ele) => ele.checked = true);
    } else {
      setIsChecked(false);
      // await dispatch(taskActions.bulkUncheckTask(currentList));
      for (const key in currentList) {
        await dispatch(taskActions.uncheckATask(key));
      }
      document.querySelectorAll(".task-checkbox").forEach((ele) => ele.checked = false);
    }
  };

  const deleteSelected = async (e) => {
    if (Object.keys(checkedTasks).length) {
      let { message } = await dispatch(taskActions.deleteCheckedTasks(checkedTasks));
      if (message === "Task deleted") document.querySelector(`#sideNav-tab-${listId}`).click();
    }
  };

  const updateSelected = async (arg) => {
    if (Object.keys(checkedTasks).length) {
      console.log(checkedTasks, "CHECKED TASKS");
      if (arg === "completed") {
        await dispatch(taskActions.updateCheckedTasks(checkedTasks, arg));
      } else if (arg === "priority") {
        // do dropdown with priority options
        // await dispatch(taskActions.updateCheckedTasks(checkedTasks));
      }
    }
  };

  return (
    <div className="edit-container">
      <input
        type="checkbox"
        className={`master-checkbox master-checkbox-listId-${listId}`}
        // checked={isChecked}
        value={listId}
        onClick={(e) => taskSelect(e)}
      />
      <button onClick={() => updateSelected("completed")}>
        <i className="fas fa-check"></i>
      </button>
      <button onClick={() => updateSelected("priority")}>
        <i className="fas fa-exclamation-circle"></i>
      </button>
      <button onClick={deleteSelected}>
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
}

export default EditTasks;
