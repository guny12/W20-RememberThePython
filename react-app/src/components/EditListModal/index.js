import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditListForm from "./EditListForm";
import { Button } from "react-bootstrap";
import styles from "./EditList.module.css"

function EditListModal({ title, id }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button variant="Light" className={styles.editBtn} onClick={() => setShowModal(true)}>
        <i className="far fa-edit"></i>
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
