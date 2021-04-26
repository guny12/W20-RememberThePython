import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import NewListForm from "./NewListForm";
import { Button } from "react-bootstrap";

function ListModal({ title }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button variant="dark" onClick={() => setShowModal(true)}>
        {title}
      </Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewListForm />
        </Modal>
      )}
    </>
  );
}

export default ListModal;
