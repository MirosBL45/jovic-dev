// react/next stuff
import Image from 'next/image';

//components
import LinkButton from '@/components/Buttons/LinkButton';

// data
import { aboutData } from '@/utils/data';
import { allYears } from '@/utils/GeneralFunctions.js';

// style
import styles from './about.module.css';
import '@/app/globals.css';

function About() {
  return (
    <div id="about" className={styles.container}>
      <header className={styles.imgText}>
        <h2>About Me</h2>
        <p>Creating Exceptional Digital Experiences</p>
      </header>
      <div className={styles.imgContainer}>
        <Image
          src={'/coverAbout.jpg'}
          alt="jovic-dev"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <section className={styles.textContainer}>
        <article className={styles.item}>
          <header>
            <h2>Who Am I?</h2>
          </header>
          <p>
            I am Miroslav Jović, a professional Frontend Developer committed to
            delivering high-quality and scalable web solutions. With over{' '}
            {allYears} years of experience, I specialize in crafting
            user-friendly interfaces and responsive websites.
          </p>
          <p>
            Specializing in ReactJS and NextJS, I leverage these cutting-edge
            technologies to bring web projects to life. ReactJS, renowned for
            its component-based architecture, allows me to build modular and
            reusable UI elements, ensuring a streamlined development process.
          </p>
          <p>
            NextJS, on the other hand, enhances the performance of web
            applications through server-side rendering and simplified routing.
            This not only results in faster load times but also contributes to a
            smoother and more engaging user experience.
          </p>
          <p>
            By harnessing the power of ReactJS and NextJS, I deliver web
            solutions that seamlessly blend functionality and aesthetics,
            catering to both the needs of the client and the end user.
          </p>
        </article>
        <article className={styles.item}>
          <header>
            <h2>What I Do?</h2>
          </header>
          <p>
            My role is to leverage sophisticated Frontend development skills to
            help digital visions become a reality. I prioritize the optimization
            of websites for speed, scalability, and an intuitive user journey.
          </p>
          <p>
            In every project, I aim to translate design concepts into
            interactive and dynamic web interfaces that not only meet but exceed
            user expectations. With a keen eye on industry trends and standards,
            I implement innovative Frontend solutions that stand out in the
            ever-evolving digital landscape.
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
