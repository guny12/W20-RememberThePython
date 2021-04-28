import React from 'react';
import './Tasks.css';

function Task({ task }) {

  return (
    <div className="task-container">
      <input type="checkbox" value={task.id} />
      <h1>{task.content}</h1>
    </div>
  )
}

export default Task
