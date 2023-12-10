// react/next stuff
import Image from 'next/image';
import Link from 'next/link';

// components
import { formatDate } from '@/utils/GeneralFunctions';
import ScrollButton from '@/components/ScrollButton/ScrollButton';

// style
import styles from './page.module.css';

// function for catching data
async function getData() {
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

// Static metadata
export const metadata = {
  title: 'Jovic-dev Blog',
  description: 'Blog Jovic Miroslav on web',
};

async function Blog() {
  const data = await getData();

  return (
    <div>
      {data.map((item) => (
        <Link
          key={item._id}
          href={`blog/${item.slug}`}
          className={styles.container}
        >
          <div className={styles.imgContainer}>
            <Image src={item.image} alt="" width={400} height={250} />
          </div>
          <div className={styles.content}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <span>{item.createdAt && formatDate(item.createdAt)}</span>
          </div>
        </Link>
      ))}
      <ScrollButton />
    </div>
  );
}

export default Blog;
