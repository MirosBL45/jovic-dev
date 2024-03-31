'use client';

// react/next stuff
import Image from 'next/image';
import { useContext } from 'react';

// data
import { aboutDataText } from '@/utils/allData/about';

// context
import { ThemeContext } from '@/context/ThemeContext';

// style
import styles from './about.module.css';

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
    <div className={styles.aboutTextMainWithLine}>
      <section className={styles.textMe}>
        <article className={styles.articleText}>
          {aboutDataText.map((item) => (
            <div className={styles.textandIcons} key={item.id}>
              <div className={styles.justText}>
                <h3>{item.title}</h3> <p>{item.text}</p>
              </div>
              <Image
                className={styles.square}
                src={mode === 'light' ? squareDark : squareLight}
                alt="square Miroslav Jovic Frontend Developer"
                title="square Miroslav Jovic Frontend Developer"
                width={32}
                height={32}
              />
              <Image
                className={styles.line}
                src={mode === 'light' ? lineDark : lineLight}
                alt="line Miroslav Jovic Frontend Developer"
                title="line Miroslav Jovic Frontend Developer"
                width={0}
                height={0}
              />
            </div>
          ))}
        </article>
        <div className={styles.miroslav}>
          <Image
            src={mode === 'light' ? Miroslav : MiroslavLight}
            alt="Miroslav Jovic Frontend Developer"
            title="Miroslav Jovic Frontend Developer"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </section>
      <hr
        className={styles.horizontalLine}
        style={{
          border: 'none',
          borderBottom: `1px solid ${
            mode === 'light'
              ? 'rgba(1, 0, 10, 0.35)'
              : 'rgba(255, 255, 255, 0.74)'
          }`,
        }}
      />
    </div>
  );
}

export default AboutText;
