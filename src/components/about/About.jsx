// react/next stuff
import Image from 'next/image';

//components
import LinkButton from '@/components/Buttons/LinkButton';

// data
import { aboutData } from '@/utils/data';

// style
import styles from './about.module.css';
import '@/app/globals.css';

function About() {
  return (
    <div id="about" className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={'/coverAbout.jpg'}
          alt="jovic-dev"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <header className={styles.imgText}>
        <h2>About Me</h2>
        <p>You are what you believe you are</p>
      </header>
      <section className={styles.textContainer}>
        <article className={styles.item}>
          <header>
            <h2>Who Am I?</h2>
          </header>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
            praesentium labore nostrum maxime voluptatum, quaerat laboriosam
            quas possimus!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, ad.
            Praesentium facere minima tempora saepe aperiam dolore deserunt.
            Nihil quo excepturi sed quas odio commodi asperiores libero ipsa
            officiis accusantium rem, aspernatur vero repudiandae architecto
            labore.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
            asperiores obcaecati nulla est fuga quod ipsum veritatis impedit.
          </p>
        </article>
        <article className={styles.item}>
          <header>
            <h2>What I Do?</h2>
          </header>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            vero quo fugit molestias nisi, nam blanditiis harum consectetur.
            Ullam maiores ipsa voluptatum!
          </p>
          <ul>
            {aboutData.map(({ id, text }) => (
              <li key={id}>{text}</li>
            ))}
          </ul>
          <LinkButton title={'Contact'} text={'Contact'} url={'/contact'} />
        </article>
      </section>
    </div>
  );
}

export default About;
