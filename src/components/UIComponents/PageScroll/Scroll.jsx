'use client';

// react/next stuff
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Scroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = pathname.split('#')[1];
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <></>;
}
