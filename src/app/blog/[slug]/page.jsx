// react/next stuff
import Image from 'next/image';
import { notFound } from 'next/navigation';

// style
import styles from './page.module.css';

// function for catching data
async function getData(slug) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${slug}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

async function BlogPost({ params }) {
  const data = await getData(params.slug);
  return (
    <div>
      <div className={styles.top}>
        <div className={styles.info}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            nobis, atque officiis placeat numquam doloremque dolorum aperiam
            magnam iusto.
          </p>
          <div className={styles.author}>
            <Image
              className={styles.avatar}
              src={'/avatar.jpg'}
              alt="avatar"
              width={40}
              height={40}
            />
            <span className={styles.username}>Mike Pajic</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src={'/people-working.jpg'} alt="people" fill={true} />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem assumenda enim odit magni nihil consequatur dolores
          dolor! Officiis totam rem nihil nemo similique officia? Officia
          architecto itaque a quidem voluptas magni qui?
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta qui
          expedita veniam dicta labore. Minima.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
          odit!
        </p>
      </div>
    </div>
  );
}

export default BlogPost;
