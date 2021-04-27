import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import NewListForm from "./NewListForm";
import { Button } from "react-bootstrap";

function ListModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button variant="light" onClick={() => setShowModal(true)}>
        <i className="fas fa-plus"></i>
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
