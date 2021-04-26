import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as taskActions from "../../store/tasks";

const AllTasks = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tasks = useSelector((state) => state.tasks.allTasks);
  console.log(tasks, "------------------------TASKS")
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

  let taskList = (
    Object.values(tasks)
  )
  return (
    <div>
      <div>
        <h2>Tasks</h2>
      </div>
      <div>
        {for (task in tasks) {
          return (
            <div key={task.id}>
            {task.id}
            {/* <button id={lis.id} onClick={handleDelete}>
              DELETE
            </button> */}
          </div>
          )
        }}
      </div>
    </div>
  );
};

export default AllTasks;
