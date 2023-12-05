'use client';

// react/next stuff
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

// data
import { links } from '@/utils/data';

// components
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

// logo
import LogoMJ from 'public/logoMJ.png';

// icons
import { MdOutlineClose } from 'react-icons/md';
import { HiMiniBars3BottomRight } from 'react-icons/hi2';

// style
import styles from './navbar.module.css';

function Navbar() {
  const [isNavShowing, setIsNavShowing] = useState(false);
  const session = useSession();

  return (
    <nav className={styles.container}>
      <Link
        href={'/'}
        className={styles.logo}
        onClick={() => setIsNavShowing(false)}
      >
        <Image src={LogoMJ} alt="LogoMJ" width={50} height={50} />
      </Link>
      <DarkModeToggle />
      <div
        className={`${styles.links} ${
          isNavShowing ? styles.show_nav : styles.hide_nav
        }`}
      >
        {links.map((link) => (
          <Link
            onClick={() => setIsNavShowing(false)}
            key={link.id}
            href={link.url}
            className={`${styles.link} ${isNavShowing && styles.open}`}
          >
            {link.title}
          </Link>
        ))}
        {session.status === 'authenticated' && (
          <button
            className={`${styles.logout} ${isNavShowing && styles.open}`}
            onClick={signOut}
          >
            Logout
          </button>
        )}
      </div>
      {/* toggle button for mobile */}
      <button
        onClick={() => setIsNavShowing(!isNavShowing)}
        className={styles.toggleBtn}
      >
        {isNavShowing ? <MdOutlineClose /> : <HiMiniBars3BottomRight />}
      </button>
    </nav>
  );
}

export default Navbar;
