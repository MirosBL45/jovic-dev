// react/next stuff
import Link from 'next/link';

// style
import styles from './page.module.css';

function BlogLayout({ children }) {
  return (
    <div className="layoutContainerAll">
      <header className={styles.layoutTitle}>
        <h1>
          Read my {'{'}blog{'}'} posts
        </h1>
        <p>
          You can go to the{' '}
          <Link title="Take me to the Dashboard" href={'/dashboard'}>
            Dashboard
          </Link>
          , and {'<'}register{'>'} to make {'['}your own{']'} Posts
        </p>
      </header>
      {children}
    </div>
  );
}

export default BlogLayout;
