import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import * as taskActions from "../../store/tasks";
import Task from "../Tasks/index"

const AllTasks = ({listId}) => {
  console.log(listId, "ID--------------------------")
  const dispatch = useDispatch();
  // const history = useHistory();
  const tasks = useSelector((state) => state.tasks.allTasks);
  const listTasks = {}
  if (listId > 0) {
    for (const task in tasks) {
      if (tasks[task].listId === listId) {
        listTasks[task] = tasks[task]
      }
    }
  }
  // const handleDelete = async (e) => {
  //   e.preventDefault();
  //   const toBeDeleted = {
  //     listId: e.target.id,
  //   };
  //   await dispatch(deleteList(toBeDeleted));
  //   dispatch(getAllLists());
  //   return history.push("/lists");
  // };

	const sessionUser = useSelector((state) => state.session.user);


  const [content, setContent] = useState("")
  const [completed, setCompleted] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [dueDate, setDueDate] = useState(null)
  const [priority, setPriority] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      content,
      creatorId: sessionUser.id,
      listId,
      completed,
      startDate,
      dueDate,
      priority,
      // createdAt,
      // updatedAt
  };

  // const newTask = await dispatch(createTask(payload));
  
}

  useEffect(() => {
    dispatch(taskActions.getTasks());
  }, [dispatch]);
  let tasksDiv;
  if (listId > 0) {
    tasksDiv = Object.values(listTasks)
  } else {
    tasksDiv = Object.values(tasks);
  }

 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        placeholder="Add a task..."
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        >
        </input>
        <button type="submit">Add Task</button>
      </form>
      {tasksDiv?.map((task) => (
        <Task task={task}/>
        // <div key={task.id}>{task.id}</div>
      ))}
    </div>
  );
};

export default AllTasks;
