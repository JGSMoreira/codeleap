import React, { createContext, useContext, useState } from "react";
import ModalEdit from ".";

const EditContext = createContext();

const EditProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState({});
  const [onConfirm, setOnConfirm] = useState(() => {});

  const showEditModal = (id, title, content, onConfirm = () => {}) => {
    
    setShow(true);
    setOnConfirm(onConfirm);
    setContent({ id, title, content });
  };

  const hideEditModal = () => {
    setShow(false);
  };

  return (
    <EditContext.Provider
      value={{ show, showEditModal, hideEditModal, onConfirm }}
    >
      <ModalEdit show={show} content={content} close={hideEditModal} onConfirm={onConfirm}/>
      {children}
    </EditContext.Provider>
  );
};

export const useEditModal = () => useContext(EditContext);

export { EditContext, EditProvider };
