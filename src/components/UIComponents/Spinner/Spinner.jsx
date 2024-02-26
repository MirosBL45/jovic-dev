// style
import styles from './Spinner.module.css';

function Spinner({ text }) {
  return (
    <div className={styles.bigContaner}>
      <p>{text}</p>
      <div className={styles.loadingSpinnerContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    </div>
  );
}

export default Spinner;
