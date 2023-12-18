// react/next stuff
import { notFound } from 'next/navigation';
import Image from 'next/image';

// components
import { formatDate } from '@/utils/GeneralFunctions';
import ScrollButton from '@/components/ScrollButton/ScrollButton';

// style
import styles from './page.module.css';

// function for catching data
async function getData(slug) {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
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
    title: `Jovic-dev: ${post.title}`,
    description: post.description,
  };
}

async function BlogPost({ params }) {
  const data = await getData(params.slug);

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
              {/* <img loading="lazy" src={data.image} alt={data.title} /> */}
              <Image
                src={data.image}
                alt={data.title}
                width={500}
                height={300}
              />
            </div>
          </section>
          <aside className={styles.content}>
            <p>{data.content}</p>
          </aside>
        </main>
      )}
      <ScrollButton />
    </>
  );
}

export default BlogPost;
