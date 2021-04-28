import React from 'react';
import './Tasks.css';

function Task({ task }) {
  const test = (e) => {
    const allTasks = document.querySelectorAll(".task-checkbox");
    const masterCheckbox = document.querySelectorAll(".master-checkbox");

    let checkedCounter = 0;
    let uncheckedCounter = 0;

    allTasks.forEach((task) => {
      if (task.checked) {
        checkedCounter++;
      } else {
        uncheckedCounter++;
      }
    });

    if (checkedCounter > 0 && uncheckedCounter > 0) {
      masterCheckbox.forEach((checkbox) => checkbox.indeterminate = true);
    } else if (checkedCounter === 0) {
      masterCheckbox.forEach((checkbox) => checkbox.indeterminate = false);
      masterCheckbox.forEach((checkbox) => checkbox.checked = false);
    } else if (uncheckedCounter === 0) {
      masterCheckbox.forEach((checkbox) => checkbox.indeterminate = false);
      masterCheckbox.forEach((checkbox) => checkbox.checked = true);
    }

    console.log("list of checkboxes:", allTasks);
    console.log("checked:::", checkedCounter, " unchecked:::", uncheckedCounter);
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
