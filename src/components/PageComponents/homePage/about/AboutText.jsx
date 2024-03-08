'use client';

// react/next stuff
import Image from 'next/image';
import { useContext } from 'react';

// data
import { aboutDataText } from '@/utils/allData/about';
import { homePortfolio } from '@/utils/allData/homePortfolio';

// context
import { ThemeContext } from '@/context/ThemeContext';

// style
import styles from './about.module.css';
import '@/app/globals.css';

// images
import lineDark from 'public/homePage/about/line dark Miroslav Jovic Frontend Developer.png';
import lineLight from 'public/homePage/about/line light Miroslav Jovic Frontend Developer.png';
import squareDark from 'public/homePage/about/square dark Miroslav Jovic Frontend Developer.png';
import squareLight from 'public/homePage/about/square light Miroslav Jovic Frontend Developer.png';
import Miroslav from 'public/homePage/about/Miroslav Jovic Frontend Developer.webp';
import MiroslavLight from 'public/homePage/about/light Miroslav Jovic Frontend Developer.webp';

function AboutText() {
  const { mode } = useContext(ThemeContext);
  return (
    <section className={styles.textMe}>
      <article>
        {aboutDataText.map((item) => (
          <div className={styles.justText} key={item.id}>
            <p>{item.title}</p>
            <p>{item.text}</p>
          </div>
        ))}
      </article>
      <div className={styles.miroslav}>
        <Image
          src={mode === 'light' ? Miroslav : MiroslavLight}
          alt="Miroslav Jovic Frontend Developer"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
    </section>
  );
}

export default AboutText;
