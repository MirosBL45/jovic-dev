// react/next stuff
import Image from 'next/image';

// components
import { formatDate } from '@/utils/GeneralFunctions';

// style
import styles from './page.module.css';

export default function SlugCard({ data }) {
  // function for break text into parts
  function splitContent(content) {
    const sentences = content.split('. ');
    const maxCharacters = 400;
    let currentCharacters = 0;
    let result = [];

    sentences.forEach((sentence, index) => {
      const sentenceLength = sentence.length + 1; // Add 1 for the space
      if (currentCharacters + sentenceLength > maxCharacters && index !== 0) {
        // If we exceed the limit and are not at the beginning, add twice <br>
        result.push(<br key={`br1_${index}`} />);
        result.push(<br key={`br2_${index}`} />);
        currentCharacters = 0; // Reset the counter
      }

      result.push(sentence + (index === sentences.length - 1 ? '' : '. '));
      currentCharacters += sentenceLength;
    });

    return result;
  }

  return (
    <>
      <section className={styles.top}>
        <div className={styles.info}>
          <header>
            <h3>{data.headline1}</h3>
          </header>
          <p className={styles.desc}>{data.description1}</p>
          <div className={styles.author}>
            by
            <span className={styles.username}>{data.username}</span>from
            <time>{data.createdAt && formatDate(data.createdAt)}</time>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data.image}
            alt={`${data.title} - Jovic Miroslav, Frontend Developer`}
            title={`${data.title} - Jovic Miroslav, Frontend Developer`}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </section>
      <aside className={styles.content}>{splitContent(data.content1)}</aside>
    </>
  );
}
