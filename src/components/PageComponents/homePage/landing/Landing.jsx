// style
import styles from './landing.module.css';
import '@/app/globals.css';

function Landing() {
  const technologies = [
    'JavaScript',
    'React',
    'Next.js',
    'Vue.js',
    'MongoDB',
    'Tailwind CSS',
    'Sass',
  ];

  return (
    <>
      <main className={`${styles.container} layoutContainerAll`}>
        <header className={styles.mainHeadline}>
          <h1>Frontend Developer</h1>
          <p>
            {'{ '}
            {technologies.map((tech, index) => (
              <span key={index}>
                {tech}
                {index !== technologies.length - 1 ? ', ' : '...'}
              </span>
            ))}
            {' }'}
          </p>
        </header>
        <article className={styles.justText}>
          Specializing in React & Next.js I leverage cutting-edge technologies
          to bring web projects to life.
        </article>
      </main>
    </>
  );
}

export default Landing;
