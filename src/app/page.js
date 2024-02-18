// react/next stuff
import Image from 'next/image';

// images
import Hero from 'public/hero.svg';

//components
import LinkButton from '@/components/CustomInputs/Buttons/LinkButton';
import About from '@/components/PageComponents/homePage/about/About';
import Portfolio from '@/components/PageComponents/homePage/portfolio/Portfolio';
import Contact from '@/components/PageComponents/homePage/contact/Contact';
import ScrollButton from '@/components/UIComponents/ScrollButton/ScrollButton';

// style
import styles from './page.module.css';
import './globals.css'

export default function Home() {
  return (
    <>
      <main className={`${styles.container} layoutContainerAll`}>
        <header className={styles.item}>
          <h1 className={styles.title}>
            <span>Better </span>
            <span>solution </span>
            <span>for </span>
            <span>your </span>
            <span>digital </span>
            <span>products.</span>
          </h1>
          <p className={styles.description}>
            Turning your Idea into Reality. Discover My Power to Create Premium Web Solutions.
          </p>
          <LinkButton title={'Go to Portfolio to see My Works'} text={'See My Works'} url={'/portfolio'} />
        </header>
        <div className={styles.item}>
          <Image src={Hero} alt="jovic-dev hero" className='moveImage' />
        </div>
      </main>
      <About />
      <Portfolio />
      <Contact />
      <ScrollButton />
    </>
  );
}
