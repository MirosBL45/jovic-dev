// react/next stuff
import Image from 'next/image';
import Link from 'next/link';

// components
import { formatDate } from '@/utils/GeneralFunctions';
import ScrollButton from '@/components/UIComponents/ScrollButton/ScrollButton';
import { BASE_API_URL } from '@/utils/constants';

// style
import styles from './page.module.css';

// function for catching data
async function getData() {
  const res = await fetch(`${BASE_API_URL}/api/posts`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

// Static metadata
export const metadata = {
  title: `Jović Miroslav's Blog`,
  description:
    'Blog of Jović Miroslav on the web. Read the latest interesting blogs',
};

async function Blog() {
  // check for url
  if (!BASE_API_URL) {
    return (
      <p style={{ marginTop: '150px', fontSize: '45px' }}>conection failed</p>
    );
  }

  const data = await getData();

  return (
    <main className={styles.allBlogs}>
      {data.map((item) => (
        <section key={item._id}>
          <Link href={`blog/${item.slug}`} className={styles.container}>
            <div className={styles.imgContainer}>
              <Image
                src={item.image}
                alt={item.title}
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
            <div className={styles.content}>
              <header>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </header>
              <time>{item.createdAt && formatDate(item.createdAt)}</time>
            </div>
          </Link>
        </section>
      ))}
      <ScrollButton />
    </main>
  );
}

export default Blog;
