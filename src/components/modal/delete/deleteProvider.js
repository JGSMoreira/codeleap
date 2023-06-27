import React, { createContext, useContext, useState } from "react";
import ModalDelete from ".";

const DeleteContext = createContext();

const DeleteProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [posts, setPosts] = useState([]);

  const showDeleteModal = (id, posts) => {
    setShow(true);
    setPosts(posts);
    setId(id);
  };

  const hideDeleteModal = () => {
    setShow(false);
  };

  return (
    <DeleteContext.Provider value={{ show, showDeleteModal, hideDeleteModal }}>
      <ModalDelete show={show} id={id} close={hideDeleteModal} posts={posts} />
      {children}
    </DeleteContext.Provider>
  );
};

export const useDeleteModal = () => useContext(DeleteContext);

export { DeleteContext, DeleteProvider };
