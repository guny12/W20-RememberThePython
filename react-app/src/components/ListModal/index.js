import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import NewListForm from "./NewListForm";
import { Button } from "react-bootstrap";
import styles from "./ListForm.module.css";

function ListModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button variant="light" className={styles.addBtn} onClick={() => setShowModal(true)}>
        <i className={`fas fa-plus`}></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewListForm />
        </Modal>
      )}
    </>
  );
}

export default ListModal;
