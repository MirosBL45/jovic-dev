// react/next stuff
import Image from 'next/image';

//components
import LinkButton from '@/components/Buttons/LinkButton';

// style
import styles from './about.module.css';
import '@/app/globals.css';

function AboutComponent({ aboutDataText, allYears, aboutData }) {
  return (
    <>
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
            <h2>{aboutDataText[7].headline1}</h2>
          </header>
          <p>
            {aboutDataText[0]} {allYears} {aboutDataText[1]}
          </p>
          <p>{aboutDataText[2]}</p>
          <p>{aboutDataText[3]}</p>
          <p>{aboutDataText[4]}</p>
        </article>
        <article className={styles.item}>
          <header>
            <h2>{aboutDataText[7].headline2}</h2>
          </header>
          <p>{aboutDataText[5]}</p>
          <p>{aboutDataText[6]}</p>
          <ul>
            {aboutData.map(({ id, text }) => (
              <li key={id}>{text}</li>
            ))}
          </ul>
          <LinkButton title={'Contact'} text={'Contact'} url={'/contact'} />
        </article>
      </section>
    </>
  );
}

export default AboutComponent;
