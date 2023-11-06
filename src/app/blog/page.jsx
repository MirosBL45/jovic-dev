// react/next stuff
import Image from 'next/image';
import Link from 'next/link';

// style
import styles from './page.module.css';

// function for catching data
async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function Blog() {
  const data = await getData();

  return (
    <div>
      {data.map((item) => (
        <Link
          key={item.id}
          href={'/blog/testSlug'}
          className={styles.container}
        >
          <div className={styles.imgContainer}>
            <Image src={'/laptop.jpg'} alt="" width={400} height={250} />
          </div>
          <div className={styles.content}>
            <h1>{item.title}</h1>
            <p>{item.body}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Blog;
