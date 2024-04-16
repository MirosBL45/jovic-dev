import styles from './Popup.module.css';

// icons
import { CgDanger } from 'react-icons/cg';
import { FaRegTrashCan } from 'react-icons/fa6';
import { LuFlagOff } from 'react-icons/lu';

function DeletePopUp({ confirmDelete, cancelDelete }) {
  return (
    <div className={`${styles.overlay} ${styles.open}`}>
      <div className={styles.popupOutline}>
        <div className={styles.popup}>
          <div className={styles.contentDelete}>
            <span className={styles.delete}>
              <CgDanger />
            </span>
            <p>Delete this post?</p>
            <p>Once you delete a post, there is no going back.</p>
            <p>Please be certain.</p>
            <div className={styles.buttons}>
              <button className={styles.cancelButton} onClick={cancelDelete}>
                Cancel <LuFlagOff />
              </button>
              <button className={styles.deleteButton} onClick={confirmDelete}>
                Delete <FaRegTrashCan />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletePopUp;
