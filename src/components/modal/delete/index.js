import { deletePost } from "@/actions/api";
import Modal from "..";
import { useLoading } from "../loading/loadingProvider";

export default function ModalDelete({ id, close, show, posts }) {
  const loading = useLoading();

  async function handleDelete() {
    loading.showLoading();
    try {
      await deletePost(id);
      const post = posts.results.filter((post) => post.id == id)[0];
      posts.results.splice(posts.results.indexOf(post), 1);
    } catch (err) {
      alert(err.message);
    }
    loading.hideLoading();
    close();
  }

  return (
    <Modal show={show} title={"Are you sure you want to delete this item?"}>
      <Modal.Footer>
        <button className="button secondary" onClick={close}>
          Cancel
        </button>
        <button className="button red" onClick={handleDelete}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
}
