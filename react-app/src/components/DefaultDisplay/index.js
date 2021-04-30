import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const DefaultDisplay = ({tasks, currentList}) => {

	return (
		<div>
			<h4>{currentList && currentList.title}</h4>
			<div className="num-display">
				<div className="num-tasks">
					<h5>{Object.values(tasks).length}</h5>
					<p>tasks</p>
				</div>
				<div className="num-completed">
					<h5>0</h5>
					<p>completed</p>
				</div>
			</div>
		</div>
	)
}

export default DefaultDisplay;