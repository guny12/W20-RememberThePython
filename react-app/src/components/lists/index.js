import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editList, getAllLists } from "../../store/lists";
import ListModal from "../ListModal";

const ListBrowser = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.allLists);

  const showEditForm = () => {
    return;
  };

  useEffect(() => {
    dispatch(getAllLists());
  }, [dispatch]);

  return (
    <div>
      <div>
        <h2>Lists</h2>
      </div>
      <div>
        {lists?.map((lis) => (
          <div key={lis.id}>
            {lis.title}
            <ListModal title="Rename list" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBrowser;
