'use client';

// react/next stuff
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// components
import { TabTitle } from '@/utils/GeneralFunctions';

// style
import styles from './page.module.css';

function Dashboard() {
  useEffect(() => {
    TabTitle('Jovic-dev Dashboard');
  }, []);

  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  console.log(data);

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
    const content = e.target[3].value;
    const avatar = e.target[4].value;
    const slug = e.target[5].value;

    try {
      await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          image,
          content,
          avatar,
          slug,
          username: session.data.user.name,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (session.status === 'authenticated') {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {data.map((post) => (
            <div className={styles.post} key={post._id}>
              <div className={styles.imgContainer}>
                <Image src={post.image} alt={post.title} />
              </div>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <span className={styles.delete}>X</span>
            </div>
          ))}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder="Title" />
          <input type="text" placeholder="Description" />
          <input type="text" placeholder="Image" />
          <input type="text" placeholder="Content" />
          <input type="text" placeholder="Your Avatar" />
          <input
            type="text"
            placeholder="Slug of the post, short one string with dashes"
          />
          <textarea placeholder="Content" cols="30" rows="10"></textarea>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }
}

export default Dashboard;
