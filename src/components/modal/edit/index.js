import { useState } from "react";
import Modal from "..";
import { editPost } from "@/actions/api";
import { useLoading } from "../loading/loadingProvider";

export default function ModalEdit({ content, close, show, posts }) {
  const [newTitle, setNewTitle] = useState(content?.title);
  const [newContent, setNewContent] = useState(content?.content);
  const loading = useLoading();

  const handleTitleChange = (e) => setNewTitle(e.target.value?.trim());
  const handleContentChange = (e) => setNewContent(e.target.value?.trim());

  async function handleSubmit(event) {
    loading.showLoading();
    event.preventDefault();
    try {
      await editPost({id: content.id, title: newTitle, content: newContent});
      const post = posts.results.filter((post) => post.id == content.id)[0];
      post.title = newTitle;
      post.content = newContent;
    }
    catch (error) {
      alert(error);
    }
    loading.hideLoading();
    close();
  }

  return (
    <Modal show={show} title={"Edit item"}>
      <form onSubmit={handleSubmit} className="flex_form">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          defaultValue={content?.title}
          onChange={handleTitleChange}
        />
        <label htmlFor="content">Content</label>
        <textarea
          defaultValue={content?.content}
          onChange={handleContentChange}
        ></textarea>
        <Modal.Footer>
          <button className="secondary" onClick={close}>
            Cancel
          </button>
          <button
            className="primary"
            type="submit"
            disabled={newTitle == "" || newContent == ""}
          >
            Save
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
