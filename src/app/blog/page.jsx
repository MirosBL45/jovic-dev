// react/next stuff
import Image from 'next/image';
import Link from 'next/link';

// style
import styles from './page.module.css';

function Blog() {
  return (
    <div>
      <Link href={'/blog/testSlug'} className={styles.container}>
        <div className={styles.imgContainer}>
          <Image src={'/laptop.jpg'} alt="" width={400} height={250} />
        </div>
        <div className={styles.content}>
          <h1>Test</h1>
          <p>
            Desc Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
            repellendus eius.
          </p>
        </div>
      </Link>
      <Link href={'/blog/testSlug'} className={styles.container}>
        <div className={styles.imgContainer}>
          <Image src={'/laptop.jpg'} alt="" width={400} height={250} />
        </div>
        <div className={styles.content}>
          <h2>Test</h2>
          <p>
            Desc Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
            repellendus eius.
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Blog;
