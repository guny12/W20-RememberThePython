import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./TaskDisplay.css";
import {editedTaskDropdown} from "../../store/tasks"

const TaskDisplay = ({lists, selectedTask, currentList}) => {


  const dispatch = useDispatch()
  const [dueDate, setDueDate] = useState("2020-08-0")
  const [newListId, setNewListId] = useState()
  console.log(selectedTask, "SELECTED TASK!!!")

  // useEffect(() => {
  //   console.log(dueDate, "DUE DATE!!!!")
    const change = {taskId:selectedTask.id, listId:currentList.id, dueDate, content:selectedTask.content}
  //   dispatch(editedTaskDropdown(change))
  // }, [dispatch])

  // useEffect(() => {
  //   const change = {taskId:selectedTask.id, listId:newListId, dueDate}
  //   dispatch(editedTaskDropdown(change))
  // }, [newListId, dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const change = {taskId:selectedTask.id, listId:currentList.id, dueDate, content:selectedTask.content}
    await dispatch(editedTaskDropdown(change))
    return
  }

  return (
		<div className="task-details-page">
			<h4>{selectedTask.content}</h4>
			<div className="dropdowns">
        <form onSubmit={handleSubmit}>
          <div className="dropdown-due-date">
            <label>due</label>
            <input type="date" id="start" name="trip-start"
              value={dueDate}
              min="2020-04-30" max="2022-12-31" onChange={(e) => setDueDate(e.target.value)}>
            </input>
          </div>
          <div className="dropdown-list">
            <label>list</label>
            <select onChange={(e) => setNewListId(e.target.value)}>
              {lists?.map(list => (<option value={list.id}>{list.title}</option>)
                )}
            </select>
          </div>
          <button type="submit">Save</button>
        </form>
			</div>
		</div>
	)
}

export default TaskDisplay;
