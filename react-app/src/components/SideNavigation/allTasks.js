import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import * as taskActions from "../../store/tasks";
import Task from "../Tasks/index";

const AllTasks = ({ listId }) => {
	const dispatch = useDispatch();
	


	// const handleDelete = async (e) => {
	//   e.preventDefault();
	//   const toBeDeleted = {
	//     listId: e.target.id,
	//   };
	//   await dispatch(deleteList(toBeDeleted));
	//   dispatch(getAllLists());
	//   return history.push("/lists");
	// };



	// let tasksDiv;
	// if (listId > 0) {
	// 	tasksDiv = Object.values(listTasks);
	// } else if (listId === -1 && tasksQuery) {
	// 	tasksDiv = Object.values(listTasks);
	// } else {
	// 	tasksDiv = Object.values(tasks);
	// }

	return (
		<div className="task-page-container">

      
			{/* <div className="task-list-container">
				{tasksDiv?.map((task) => (
					<Task task={task} key={task.id} />
				))}
			</div> */}
		</div>
	);
};

export default AllTasks;
