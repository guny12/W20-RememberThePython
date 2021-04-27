import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { searchQuery } from "../../store/search";
import AllTasks from "../SideNavigation/allTasks";

function Search() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { query } = useParams();
  const [linksOut, setLinksOut] = useState([]);

  const navOut = () => {
    document.querySelector("#search-bar").value = "";
    history.push("/");
  };

  useEffect(() => {
    const searchBar = document.querySelector("#search-bar");

    if (!searchBar.value) {
      (async () => await dispatch(searchQuery(query)))();
      searchBar.value = query
    }

    setLinksOut(document.querySelectorAll('a'));

  }, [dispatch]);

  linksOut.forEach((element) => {
    element.addEventListener("click", navOut);
  });

  return (
    <AllTasks />
  )
}

export default Search;
