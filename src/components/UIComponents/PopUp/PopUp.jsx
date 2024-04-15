import styles from './Popup.module.css';

// components
import ClickButton from '@/components/CustomInputs/Buttons/ClickButton';

function Popup({ message, onClose, showPopup }) {
  return (
    <div className={`${styles.overlay} ${showPopup ? styles.open : ''}`}>
      <div className={styles.popupOutline}>
        <div className={styles.popup}>
          <div className={styles.content}>
            <p>{message}</p>
            <ClickButton onClick={onClose} title={'All right'}>
              {'All right'}
            </ClickButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
