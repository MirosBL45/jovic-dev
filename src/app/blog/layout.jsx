// style
import styles from './page.module.css';
import '@/app/globals.css';

function BlogLayout({ children }) {
  return (
    <div className="layoutContainerAll">
      <header>
        <h1 className={styles.layoutTitle}>Read My Blog Posts</h1>
      </header>
      {children}
    </div>
  );
}

export default BlogLayout;
