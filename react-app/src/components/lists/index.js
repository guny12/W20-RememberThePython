import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllLists, deleteList } from "../../store/lists";
import EditListModal from "../EditListModal";

const ListBrowser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const lists = useSelector((state) => state.lists.allLists);

  const handleDelete = async (e) => {
    e.preventDefault();
    const toBeDeleted = {
      listId: e.target.id,
    };
    await dispatch(deleteList(toBeDeleted));
    dispatch(getAllLists());
    return history.push("/lists");
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
            <EditListModal title="Rename list" id={lis.id} />
            <button id={lis.id} onClick={handleDelete}>
              DELETE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBrowser;
