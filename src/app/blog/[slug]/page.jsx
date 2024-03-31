// react/next stuff
import { notFound } from 'next/navigation';
import Image from 'next/image';

// components
import { formatDate } from '@/utils/GeneralFunctions';
import ScrollButton from '@/components/UIComponents/ScrollButton/ScrollButton';
import { BASE_API_URL } from '@/utils/constants';

// style
import styles from './page.module.css';

// function for catching data
async function getData(slug) {
  const res = await fetch(`${BASE_API_URL}/api/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

// Dynamic metadata
export async function generateMetadata({ params }) {
  const post = await getData(params.slug);
  return {
    title: `Jović Miroslav's Blog: ${post.title}`,
    description: post.description,
  };
}

async function BlogPost({ params }) {
  // check for url
  if (!BASE_API_URL) {
    return <p>conection failed</p>;
  }

  const data = await getData(params.slug);

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
      {!data ? (
        notFound()
      ) : (
        <main>
          <section className={styles.top}>
            <div className={styles.info}>
              <header>
                <h2>{data.title}</h2>
              </header>
              <p className={styles.desc}>{data.description}</p>
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
          <aside className={styles.content}>{splitContent(data.content)}</aside>
        </main>
      )}
      <ScrollButton />
    </>
  );
}

export default BlogPost;
