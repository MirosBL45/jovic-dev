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
import Landing from '@/components/PageComponents/homePage/landing/Landing';

// style
import styles from './page.module.css';
import './globals.css'

export default function Home() {
  return (
    <>
      <Landing />
      <main className={`${styles.container} layoutContainerAll`}>
        <header className={styles.item}>
          <h1 className={styles.title}>
            <span>I </span>
            <span>am </span>
            <span>a </span>
            <span>developer, </span>
            <span>not </span>
            <span>a </span>
            <span>designer.</span>
          </h1>
          <p className={styles.description}>
            Specializing in React and Next.js, I leverage these cutting-edge technologies to bring web projects to life.
          </p>
          <div className={styles.frontLinks}>
            <LinkButton title={'Go to Portfolio to see My Works'} text={'See My Works'} url={'/portfolio'} />
            <LinkButton openInNewTab={true} title={'Download CV of Miroslav Jovic, Frontend Developer'} text={'Download my CV'} url={'/Miroslav Jovic CV FED 2024.pdf'} />
          </div>
        </header>
        <div className={styles.imageItem}>
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
