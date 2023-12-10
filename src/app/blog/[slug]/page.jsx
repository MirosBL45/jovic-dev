// react/next stuff
import Image from 'next/image';
import { notFound } from 'next/navigation';

// components
import { formatDate } from '@/utils/GeneralFunctions';

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
        <div>
          <div className={styles.top}>
            <div className={styles.info}>
              <h2>{data.title}</h2>
              <p className={styles.desc}>{data.description}</p>
              <div className={styles.author}>
                by
                <span className={styles.username}>{data.username}</span>from
                <span>{data.createdAt && formatDate(data.createdAt)}</span>
              </div>
            </div>
            <div className={styles.imageContainer}>
              <Image
                src={data.image}
                alt="people"
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className={styles.content}>
            <p className={styles.text}>{data.content}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogPost;
