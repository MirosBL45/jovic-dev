// style
import styles from './miniHeadline.module.css';

const MiniHeadline = ({ id, headline, description, children }) => {
  return (
    <div id={id} className={styles.container}>
      <header className={styles.mainHeadline}>
        <h2>{headline}</h2>
        <p>{description}</p>
      </header>
      {children}
    </div>
  );
};

export default MiniHeadline;
