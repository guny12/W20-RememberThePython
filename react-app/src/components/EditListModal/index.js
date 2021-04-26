import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditListForm from "./EditListForm";
import { Button } from "react-bootstrap";

function EditListModal({ title, id }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button variant="dark" onClick={() => setShowModal(true)}>
        {title}
      </Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditListForm id={id} />
        </Modal>
      )}
    </>
  );
}

export default EditListModal;
