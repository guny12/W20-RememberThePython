import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkATask, uncheckATask } from "../../store/tasks";
import './Tasks.css';

function Task({ task }) {
  const dispatch = useDispatch();
  const checkTask = useSelector((state) => state.tasks.checkedTasks);
  const primaryCheckbox = useSelector((state) => state.checkboxes.parentCheckbox);
  const [isChecked, setIsChecked] = useState(false);

  const test = async (e) => {
    console.log(Boolean(checkTask[task.id]))
    if (e.target.checked) {
      setIsChecked(true);
      await dispatch(checkATask(e.target.value));
    } else {
      setIsChecked(false);
      await dispatch(uncheckATask(e.target.value));
    }
  };

  const checkCheckbox = async (e) => {
    setIsChecked(!isChecked);
  };

  return (
    <div onClick={checkCheckbox} className="task-container">
      <input
        type="checkbox"
        id={`checkbox-taskId-${task.id}`}
        checked={isChecked}
        value={task.id}
        className="task-checkbox"
        onClick={(e) => test(e)}
      />
      <h1>{task.content}</h1>
    </div>
  )
}

export default Task;
