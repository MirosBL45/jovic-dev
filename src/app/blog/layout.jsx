// style
import styles from './page.module.css';

function BlogLayout({ children }) {
  return (
    <div>
      <h1 className={styles.layoutTitle}>Read My Blog Posts</h1>
      {children}
    </div>
  );
}

export default BlogLayout;
