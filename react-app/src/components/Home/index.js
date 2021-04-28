import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAllLists } from "../../store/lists";

const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(getAllLists());
		})();
	}, [dispatch]);

	return (
		<>
		</>
	);
};

export default Home;
