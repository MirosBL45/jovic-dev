'use client';

// react/next stuff
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

// data
import { links } from '@/utils/data';

// components
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

// style
import styles from './navbar.module.css';

function Navbar() {
  const session = useSession();

  return (
    <nav className={styles.container}>
      <Link href={'/'} className={styles.logo}>
        jovic-dev
      </Link>
      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        {session.status === 'authenticated' && (
          <button className={styles.logout} onClick={signOut}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
