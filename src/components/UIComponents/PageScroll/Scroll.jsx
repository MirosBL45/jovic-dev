'use client';

// react/next stuff
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Scroll() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      const urlLinkWindow = window.location.href;
      console.log('urlLinkWindow odmah sada');
      console.log(urlLinkWindow);
      console.log('ide isecen');
      const secen = urlLinkWindow.split('#')[1];
      const dodato = `'${secen}'`;
      console.log(secen);
      if (secen) {
        const element = document.getElementById(secen);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100);
  }, [pathname]);

  return <></>;
}
