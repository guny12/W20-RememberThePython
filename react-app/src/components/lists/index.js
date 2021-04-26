import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editList, getAllLists } from "../../store/lists";
import EditListModal from "../EditListModal";
import deleteList from "../../store/lists";

const ListBrowser = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.allLists);

  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   console.log("target Id----------------", e.target.id);
  //   const toBeDeleted = {
  //     listId: e.target.id,
  //   };
  // };

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
            <EditListModal title="Rename list" id={lis.id} />
            {/* <button id={lis.id} onClick={handleDelete()}>
              DELETE
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBrowser;
