import React, { createContext, useContext, useState } from "react";
import ModalDelete from ".";

const DeleteContext = createContext();

const DeleteProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [onConfirm, setOnConfirm] = useState(() => {});

  const showDeleteModal = (id, onConfirm = () => {}) => {
    setShow(true);
    setOnConfirm(onConfirm);
    setId(id);
  };

  const hideDeleteModal = () => {
    setShow(false);
  };

  return (
    <DeleteContext.Provider value={{ show, showDeleteModal, hideDeleteModal, onConfirm }}>
      <ModalDelete show={show} id={id} close={hideDeleteModal} onConfirm={onConfirm}/>
      {children}
    </DeleteContext.Provider>
  );
};

export const useDeleteModal = () => useContext(DeleteContext);

export { DeleteContext, DeleteProvider };
