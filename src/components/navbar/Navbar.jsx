// react/next stuff
import Link from 'next/link';

import { links } from '@/utils/data';

function Navbar() {
  return (
    <div>
      <Link href={'/'}>jovic-dev</Link>
      <div>
        {links.map((link) => (
          <Link key={link.id} href={link.url}>
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
