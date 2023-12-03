// style
import styles from './page.module.css';
import '@/app/globals.css';

function Layout({ children }) {
  return (
    <div className="layoutContainerAll">
      <h1 className={styles.mainTitle}>My Work</h1>
      {children}
    </div>
  );
}

export default Layout;
