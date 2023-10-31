// react/next stuff
import Image from 'next/image';

// style
import styles from './page.module.css';

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={'/people-working.jpg'}
          fill={true}
          alt="jovic-dev"
          className={styles.img}
        />
        <div className={styles.imgText}>
          <h1>Digital Storytellers</h1>
          <h2>Handcrafting award winning digital expiriences</h2>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h2>Who Are We?</h2>
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
        </div>
        <div className={styles.item}>
          <h2>What We Do</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            vero quo fugit molestias nisi, nam blanditiis harum consectetur.
            Ullam maiores ipsa voluptatum!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
