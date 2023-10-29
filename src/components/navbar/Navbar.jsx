'use client';

// react/next stuff
import Link from 'next/link';

// data
import { links } from '@/utils/data';

// style
import styles from './navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.container}>
      <Link prefetch href={'/'} className={styles.logo}>
        jovic-dev
      </Link>
      <div className={styles.links}>
        {links.map((link) => (
          <Link prefetch key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        <button
          className={styles.logout}
          onClick={() => {
            console.log('logged out');
          }}
        >
          click
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
