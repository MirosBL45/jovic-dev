// style
import styles from './page.module.css';

function Layout({ children }) {
  return (
    <div className={`layoutContainerAll ${styles.mainHolder}`}>
      <header className={styles.layoutTitle}>
        <h1>
          My {'<'}projects{'>'}
        </h1>
      </header>
      {children}
    </div>
  );
}

export default Layout;
