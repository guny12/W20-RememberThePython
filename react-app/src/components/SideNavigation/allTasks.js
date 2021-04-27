import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as taskActions from "../../store/tasks";

const AllTasks = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tasks = useSelector((state) => state.tasks.allTasks);
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

  let tasksDiv = Object.values(tasks);

  return (
    <div>
      {tasksDiv?.map((task) => (
        // <Task task={task}/>
        <div key={task.id}>{task.id}</div>
      ))}
    </div>
  );
};

export default AllTasks;
