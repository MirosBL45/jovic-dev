// react/next stuff
import { notFound } from 'next/navigation';

// components
import ScrollButton from '@/components/UIComponents/ScrollButton/ScrollButton';
import { BASE_API_URL } from '@/utils/constants';
import SlugCard from './SlugCard';

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
    description: post.description1,
  };
}

async function BlogPost({ params }) {
  // check for url
  if (!BASE_API_URL) {
    return <p>conection failed</p>;
  }

  const data = await getData(params.slug);

  const articleData1 = {
    title: `${data.title}`,
    headline1: `${data.headline1}`,
    description1: `${data.description1}`,
    username: `${data.username}`,
    createdAt: `${data.createdAt}`,
    image: `${data.image}`,
    content1: `${data.content1}`,
  };

  const articleData2 = {
    title: `${data.title}`,
    headline1: `${data.headline2}`,
    description1: `${data.description2}`,
    username: `${data.username}`,
    createdAt: `${data.createdAt}`,
    image: `${data.imagesecond}`,
    content1: `${data.content2}`,
  };

  return (
    <>
      {!data ? (
        notFound()
      ) : (
        <main>
          <h2 className={styles.blogTitle}>{data.title}</h2>
          <SlugCard data={articleData1} />
          <SlugCard data={articleData2} />
        </main>
      )}
      {/* <ScrollButton /> */}
    </>
  );
}

export default BlogPost;
