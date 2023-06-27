import React, { createContext, useContext, useState } from "react";
import ModalEdit from ".";

const EditContext = createContext();

const EditProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState({});
  const [posts, setPosts] = useState([]);

  const showEditModal = (id, title, content, posts) => {
    setShow(true);
    setContent({ id, title, content });
    setPosts(posts);
  };

  const hideEditModal = () => {
    setShow(false);
  };

  return (
    <EditContext.Provider
      value={{ show, showEditModal, hideEditModal }}
    >
      <ModalEdit show={show} content={content} close={hideEditModal} posts={posts}/>
      {children}
    </EditContext.Provider>
  );
};

export const useEditModal = () => useContext(EditContext);

export { EditContext, EditProvider };
