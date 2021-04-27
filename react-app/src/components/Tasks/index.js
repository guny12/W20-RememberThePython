import React from 'react';
import './Tasks.css';

function Task({
  task,
}) {
  return (
      <div className='task'>

        <div className="task-topper">
        </div>

        <div className="task-container">
          <input type="checkbox"></input>
          <h1>{task.content.slice(0,48)}..</h1>
        </div>


          <div className='searchResult__info'>
              <div className="searchResult__infoTop">
                  {/* <p>{location}</p>
                  <h3>{title}</h3>
                  <p>____</p>
                  <p>{description}</p> */}
              </div>

              <div className="searchResult__infoBottom">
                  <div className="searchResult__stars">
                      {/* <StarIcon className="searchResult__star" />
                      <p>
                          <strong>{star}</strong>
                      </p> */}
                  </div>
                  <div className='searchResults__price'>
                      {/* <h2>{price}</h2>
                      <p>{total}</p> */}
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Task
