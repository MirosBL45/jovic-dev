'use client';

// react/next stuff
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// components
import { TabTitle } from '@/utils/GeneralFunctions';
import ClickButton from '@/components/Buttons/ClickButton';

// style
import styles from './page.module.css';

// function for catching data to see slugs
async function getAllPostSlugs() {
  const response = await fetch('http://localhost:3000/api/posts');
  const posts = await response.json();
  const slugs = posts.map((post) => post.slug);
  return slugs;
}

function Dashboard() {
  // const dataForSlugs = await getDataForSlugs();
  // console.log(dataForSlugs);

  useEffect(() => {
    TabTitle('Jovic-dev Dashboard');
  }, []);

  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  if (session.status === 'loading') {
    return <p>Loading User...</p>;
  }

  if (session.status === 'unauthenticated') {
    router?.push('/dashboard/login');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const title = e.target[0].value;
    const description = e.target[1].value;
    const image = e.target[2].value;
    const avatar = e.target[3].value;
    let slug = e.target[4].value.replace(/\s+/g, '_');
    const content = e.target[5].value;

    // fetch all slugs
    const existingSlugs = await getAllPostSlugs();

    // if there is the same slug add number
    if (existingSlugs.includes(slug)) {
      let counter = 2;
      while (existingSlugs.includes(slug + counter)) {
        counter++;
      }
      slug = slug + counter;
    }

    try {
      await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          image,
          avatar,
          slug,
          content,
          username: session.data.user.name,
        }),
      });
      // it reloads page, so we can see that new post which was created
      mutate();
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(slug) {
    try {
      await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      });
      // it reloads page, so we can see it after deleting post
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  if (session.status === 'authenticated') {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? 'We are loading posts or users, think about it'
            : data?.map((post) => (
                <div className={styles.post} key={post._id}>
                  <div className={styles.imgContainer}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={200}
                      height={100}
                    />
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <span
                    onClick={() => handleDelete(post.slug)}
                    title="Delete this post?"
                    className={styles.delete}
                  >
                    X
                  </span>
                </div>
              ))}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder="Title" required />
          <input type="text" placeholder="Description" required />
          <input type="text" placeholder="Image" required />
          <input type="text" placeholder="Your Avatar" required />
          <input type="text" placeholder="Slug of the post" />
          <textarea placeholder="Content" cols="30" rows="10"></textarea>
          <ClickButton title={'Send New Post'}>Send New Post</ClickButton>
        </form>
      </div>
    );
  }
}

export default Dashboard;
