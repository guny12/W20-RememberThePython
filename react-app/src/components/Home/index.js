import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllLists } from "../../store/lists";

const Home = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user?.firstName);

	useEffect(() => {
		(async () => {
			await dispatch(getAllLists());
		})();
	}, [dispatch]);

	return <></>;
};

export default Home;
