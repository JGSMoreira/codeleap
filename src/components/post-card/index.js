import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { timeAgo } from '@/actions/utils';
import { useSelector } from "react-redux";
import styles from './post-card.module.css'
import { useEditModal } from '../modal/edit/editProvider';
import { useDeleteModal } from '../modal/delete/deleteProvider';

export default function PostCard({id, title, content, created_datetime, username, fetch}){
  const loggedUser = useSelector((state) => state.user.username);
  const modalEdit = useEditModal();
  const modalDelete = useDeleteModal();

  function handleEdit(){
    modalEdit.showEditModal(id, title, content, fetch);
  }

  function handleDelete(){
    modalDelete.showDeleteModal(id, fetch);
  }

  return (
    <div className={styles.card}>
      <div className={styles.card_header}>
        <h4>{title}</h4>
        <div className={styles.post_options}>
          {loggedUser === username && (
            <>
              <FontAwesomeIcon icon={faTrash} onClick={handleDelete} title='Delete'/>
              <FontAwesomeIcon icon={faPenToSquare} onClick={handleEdit} title='Edit'/>
            </>
          )}
        </div>
      </div>
      <div className={styles.card_body}>
        <div className={styles.post_info}>
          <span>{`@${username}`}</span>
          <span>{timeAgo(created_datetime)}</span>
        </div>
        <div className="post_content">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}