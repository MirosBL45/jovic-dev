// react/next stuff
import Image from 'next/image';

// images
import Hero from 'public/hero.svg';

//components
import LinkButton from '@/components/Buttons/LinkButton';
import About from '@/components/homePage/about/About';
import Portfolio from '@/components/homePage/portfolio/Portfolio';

// style
import styles from './page.module.css';
import './globals.css'

export default function Home() {
  return (
    <>
      <main className={`${styles.container} layoutContainerAll`}>
        <header className={styles.item}>
          <h1 className={styles.title}>
            Better solution for your digital products.
          </h1>
          <p className={styles.description}>
            Turning your Idea into Reality. We bring together the teams from the
            global tech industry.
          </p>
          <LinkButton title={'Go to Portfolio to see My Works'} text={'See My Works'} url={'/portfolio'} />
        </header>
        <div className={styles.item}>
          <Image src={Hero} alt="jovic-dev hero" className='moveImage' />
        </div>
      </main>
      <About />
      <Portfolio />
    </>
  );
}
