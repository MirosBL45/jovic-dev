'use client';

// react/next stuff
import Link from 'next/link';

// data
import { links } from '@/utils/data';

function Navbar() {
  return (
    <div>
      <Link prefetch href={'/'}>
        jovic-dev
      </Link>
      <div>
        {links.map((link) => (
          <Link prefetch key={link.id} href={link.url}>
            {link.title}
          </Link>
        ))}
        <button
          onClick={() => {
            console.log('logged out');
          }}
        >
          click
        </button>
      </div>
    </div>
  );
}

export default Navbar;
