import { deletePost } from "@/actions/api";
import Modal from "..";
import { useLoading } from "../loading/loadingProvider";

export default function ModalDelete({ id, close, onConfirm, show }) {
  const loading = useLoading();

  async function handleDelete() {
    loading.showLoading();
    try {
      await deletePost(id);
    } catch (err) {
      alert(err.message);
    }
    loading.hideLoading();
    close();
    onConfirm();
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
