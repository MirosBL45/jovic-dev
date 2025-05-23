'use client';

// react/next stuff
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';

// data
import { linksHomePage, linksOtherPages } from '@/utils/allData/links';

// components
import DarkModeToggle from '@/components/UIComponents/DarkModeToggle/DarkModeToggle';

// context
import { ThemeContext } from '@/context/ThemeContext';

// logo
import logoWhite from 'public/logo white Miroslav Jovic Frontend Developer.svg';
import logoBlack from 'public/logo black Miroslav Jovic Frontend Developer.svg';

// icons
import { MdOutlineClose } from 'react-icons/md';
import { HiMiniBars3BottomRight } from 'react-icons/hi2';
import { GrPowerShutdown } from 'react-icons/gr';

// style
import styles from './navbar.module.css';

function Navbar() {
  const [isNavShowing, setIsNavShowing] = useState(false);
  const [coloredNav, setColoredNav] = useState(false);
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { mode } = useContext(ThemeContext);

  // choose which color is navbar
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setColoredNav(scrollY > 300);
    }

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // choose which links to use depending on the page
  const otherPages = ['portfolio', 'blog'];

  const links = otherPages.some((page) => pathname.includes(page))
    ? linksOtherPages
    : linksHomePage;

  function handleLogout() {
    // Set the redirect to false and specify the callbackUrl
    signOut({ redirect: false, callbackUrl: '/' });

    // If the session is present and the user is on the active session page, manually redirect the user to the home page
    if (session && router.asPath !== '/') {
      router.push('/');
    }
  }

  return (
    <nav className={coloredNav ? styles.navbarColored : styles.navbar}>
      <div className={styles.nav_container}>
        <Link href={'/'} onClick={() => setIsNavShowing(false)}>
          <Image
            priority={true}
            src={mode === 'light' ? logoBlack : logoWhite}
            alt="logo Miroslav Jovic Frontend Developer"
            title="Miroslav Jovic Frontend Developer"
            width={186}
            height={42}
          />
        </Link>
        <div
          className={`${styles.links} ${
            isNavShowing ? styles.show_nav : styles.hide_nav
          }`}
        >
          {links.slice(0, -1).map((link, index) => (
            <div
              key={link.id}
              className={`${styles.link} ${
                pathname === link.url && styles.activeLink
              } ${isNavShowing && styles.open}`}
            >
              {index !== links.length - 1 && (
                <Link
                  title={`Miroslav Jovic Frontend Developer - ${link.title}`}
                  href={link.url}
                  onClick={() => setIsNavShowing(false)}
                >
                  {link.title}
                </Link>
              )}
            </div>
          ))}

          {/* ---------- JUST FOR MOBILE DEVICES!!! contact, theme, logout --------------- */}
          <div className={`${styles.contactAndTheme} ${styles.hiddenContact}`}>
            {/* just contact link */}
            <Link
              title="Contact Miroslav Jovic Frontend Developer"
              className={`${styles.link} ${styles.justContactButton} ${
                isNavShowing && styles.open
              }`}
              href={links[links.length - 1].url}
              onClick={() => setIsNavShowing(false)}
            >
              {links[links.length - 1].title}
            </Link>
            <div
              // div for animation in mobile view
              className={`${styles.forDarkModeToggle} ${
                isNavShowing && styles.open
              }`}
            >
              <DarkModeToggle setIsNavShowing={setIsNavShowing} />
            </div>
            {/* show Logout button when user is logged in */}
            {session.status === 'authenticated' && (
              <button
                className={`${styles.logout} ${isNavShowing && styles.open}`}
                onClick={() => {
                  handleLogout();
                  setIsNavShowing(false);
                }}
                title="Logout"
              >
                <GrPowerShutdown />
              </button>
            )}
          </div>
          {/* ^^^^^^^^^^^^^^ JUST FOR MOBILE DEVICES!!! contact, theme, logout ^^^^^^^^^^^ */}
        </div>

        {/* ---------- JUST FOR BIG DEVICES!!! contact, theme, logout --------------- */}
        <div className={`${styles.contactAndTheme} ${styles.showContact}`}>
          {/* just contact link */}
          <Link
            title="Contact Miroslav Jovic Frontend Developer"
            className={`${styles.link} ${styles.justContactButton} ${
              isNavShowing && styles.open
            }`}
            href={links[links.length - 1].url}
            onClick={() => setIsNavShowing(false)}
          >
            {links[links.length - 1].title}
          </Link>
          <div
            // div for animation in mobile view
            className={`${styles.forDarkModeToggle} ${
              isNavShowing && styles.open
            }`}
          >
            <DarkModeToggle setIsNavShowing={setIsNavShowing} />
          </div>
          {/* show Logout button when user is logged in */}
          {session.status === 'authenticated' && (
            <button
              className={`${styles.logout} ${isNavShowing && styles.open}`}
              onClick={handleLogout}
              title="Logout"
            >
              <GrPowerShutdown />
            </button>
          )}
        </div>
        {/* ^^^^^^^^^^^^^^ JUST FOR BIG DEVICES!!! contact, theme, logout ^^^^^^^^^^^ */}
        {/* toggle button for mobile */}
        <button
          onClick={() => setIsNavShowing(!isNavShowing)}
          className={styles.toggleBtn}
          title="Open/Close Navbar"
          aria-label="Open/Close Navbar"
        >
          {isNavShowing ? <MdOutlineClose /> : <HiMiniBars3BottomRight />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
