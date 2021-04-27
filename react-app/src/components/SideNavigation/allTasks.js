import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as taskActions from "../../store/tasks";
import Task from "../Tasks/index"

const AllTasks = ({listId}) => {
  console.log(listId, "ID--------------------------")
  const dispatch = useDispatch();
  const history = useHistory();
  const tasks = useSelector((state) => state.tasks.allTasks);
  const listTasks = {}
  if (listId > 0) {
    for (const task in tasks) {
      console.log(task, "LIST ID!!!!!!!!!!!", typeof parseInt(task, 10), typeof listId)
      if (tasks[task].listId === listId) {
        console.log("INSIDE FOR LOOP!!!!")
        listTasks[task] = tasks[task]
      }
    }
  }
  console.log(tasks, "------------------------TASKS");
  // const handleDelete = async (e) => {
  //   e.preventDefault();
  //   const toBeDeleted = {
  //     listId: e.target.id,
  //   };
  //   await dispatch(deleteList(toBeDeleted));
  //   dispatch(getAllLists());
  //   return history.push("/lists");
  // };

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
      <input placeholder="Add a task..."></input>
      <button>Add Task</button>
      {tasksDiv?.map((task) => (
        <Task task={task}/>
        // <div key={task.id}>{task.id}</div>
      ))}
    </div>
  );
};

export default AllTasks;
