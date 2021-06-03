import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OverlayTrigger } from "react-bootstrap";
import { completeTooltip, incompleteTooltip, priorityTooltip, deleteTooltip } from "./tooltip";

import * as checkboxActions from "../../store/checkboxes";
import * as taskActions from "../../store/tasks";

function EditTasks({ listId }) {
  const dispatch = useDispatch();
  const listAllTasks = useSelector((state) => state.tasks.allTasks);
  const checkedTasks = useSelector((state) => state.tasks.checkedTasks);
  const listAllTaskResults = useSelector((state) => state.search.results);
  const parentCheckbox = useSelector((state) => state.checkboxes.parentCheckbox);

  const getCurrentList = () => {
    if (listId === -1) {
      return listAllTaskResults.taskResults;
    } else {
      return listAllTasks;
    }
  };

  const deleteSelected = async (e) => {
    if (Object.keys(checkedTasks).length) {
      handleUncheck();
      await dispatch(taskActions.deleteCheckedTasks(checkedTasks));
    }
  };

  const updateSelected = async (arg) => {
    if (Object.keys(checkedTasks).length) {
      switch (arg) {
        case "completed":
          await dispatch(taskActions.updateCheckedTasks(checkedTasks, arg));
          return;
        case "incomplete":
          await dispatch(taskActions.updateCheckedTasks(checkedTasks, arg));
          return;
        default:
          // this is the priority option case
          return;
      }
    }
  };

  const handleCheck = () => {
    dispatch(checkboxActions.checkMainCheckbox(listId));
    dispatch(taskActions.bulkCheckTask(getCurrentList()));
  };

  const handleUncheck = () => {
    dispatch(checkboxActions.uncheckMainCheckbox(listId));
    dispatch(taskActions.bulkUncheckTask());
  };

  return (
    <div className="edit-container">
      {!parentCheckbox.checked && !parentCheckbox.indeterminate &&
        <i
          className="far fa-square"
          onClick={handleCheck}
        />
      }
      {parentCheckbox.indeterminate && !parentCheckbox.checked &&
        <i
          className="far fa-minus-square"
          onClick={handleCheck}
        />
      }
      {parentCheckbox.checked && !parentCheckbox.indeterminate &&
        <i
          className="far fa-check-square"
          onClick={handleUncheck}
        />
      }
      <OverlayTrigger
        placement="auto"
        delay={{ show: 250, hide: 50 }}
        overlay={completeTooltip}
      >
        <button onClick={() => updateSelected("completed")}>
          <i className="fas fa-check" />
        </button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="auto"
        delay={{ show: 250, hide: 50 }}
        overlay={incompleteTooltip}
      >
        <button onClick={() => updateSelected("incomplete")}>
          <i className="fas fa-times" />
        </button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="auto"
        delay={{ show: 250, hide: 50 }}
        overlay={priorityTooltip}
      >
        <button onClick={() => updateSelected("priority")}>
          <i className="fas fa-exclamation-circle" />
        </button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="auto"
        delay={{ show: 250, hide: 50 }}
        overlay={deleteTooltip}
      >
        <button onClick={deleteSelected}>
          <i className="fas fa-trash-alt" />
        </button>
      </OverlayTrigger>
    </div>
  );
}

export default EditTasks;
