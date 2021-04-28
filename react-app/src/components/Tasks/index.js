import React from 'react';
import './Tasks.css';

function Task({
  task,
}) {
  return (
      <div className='task'>

        <div className="edit-task-bar">
        </div>
        
        <div className="edit-task-bar">
      
        </div>

        <div className="task-container">
          <input type="checkbox"></input>
          <h1>{task.content.slice(0,48)}..</h1>
        </div>

      </div>
  )
}

export default Task