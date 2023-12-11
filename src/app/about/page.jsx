// react/next stuff
import Image from 'next/image';

//components
import LinkButton from '@/components/Buttons/LinkButton';

// data
import { aboutData } from '@/utils/data';

// style
import styles from './page.module.css';
import '@/app/globals.css';

// Static metadata
export const metadata = {
  title: 'Jovic-dev About',
  description: 'About Jovic Miroslav on web',
};

function About() {
  return (
    <div className={`${styles.container} layoutContainerAll`}>
      <div className={styles.imgContainer}>
        <Image
          src={'/people-working.jpg'}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="jovic-dev"
        />
        <header className={styles.imgText}>
          <h1>Digital Storytellers</h1>
          <p>Handcrafting award winning digital expiriences</p>
        </header>
      </div>
      <main className={styles.textContainer}>
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
          <LinkButton text={'Contact'} url={'/contact'} />
        </article>
      </main>
    </div>
  );
}

export default About;
