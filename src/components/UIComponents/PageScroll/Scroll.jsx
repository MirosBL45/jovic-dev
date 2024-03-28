'use client';

// react/next stuff
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Scroll() {
  const pathname = usePathname();
  // const router = useRouter();
  // const urlLinkWindow = window.location.href;
  // setTimeout(() => {
  //   const urlLinkWindow = window.location.href;
  //   console.log('urlLinkWindow odmah sada');
  //   console.log(urlLinkWindow);
  //   console.log('ide isecen');
  //   const secen = urlLinkWindow.split('#')[1];
  //   const dodato = `'${secen}'`;
  //   console.log(dodato);
  //   if (dodato) {
  //     const element = document.getElementById(dodato);
  //     if (element) {
  //       element.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   } else {
  //     window.scrollTo(0, 0);
  //   }
  // }, 100);

  useEffect(() => {
    // const hash = pathname.split('#')[1];
    // if (hash) {
    //   const element = document.getElementById(hash);
    //   if (element) {
    //     element.scrollIntoView({ behavior: 'smooth' });
    //   }
    // } else {
    window.scrollTo(0, 0);
    // }
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
    // }, [urlLinkWindow]);
  }, [pathname]);

  return <></>;
}
