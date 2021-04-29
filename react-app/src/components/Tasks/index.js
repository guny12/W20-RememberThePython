import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkATask, uncheckATask } from "../../store/tasks";
import './Tasks.css';

function Task({ task }) {
  const dispatch = useDispatch();
  const checkedTasks = useSelector((state) => state.tasks.checkedTasks);

  useEffect(() => {

  }, [checkedTasks[task.id]]);

  const test = async (e) => {
    if (e.target.checked) {
      await dispatch(checkATask(e.target.value));
    } else {
      await dispatch(uncheckATask(e.target.value));
    }
  };

  return (
    <div className="task-container">
      <input
        type="checkbox"
        id={`checkbox-taskId-${task.id}`}
        value={task.id}
        className="task-checkbox"
        onClick={(e) => test(e)}
      />
      <h1>{task.content}</h1>
    </div>
  )
}

export default Task;
