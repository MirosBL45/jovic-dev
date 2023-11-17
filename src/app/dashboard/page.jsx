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

function Dashboard() {
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
    const slug = e.target[4].value;
    const content = e.target[5].value;

    console.log('ovde su targeti');
    console.log(e.target);
    console.log('duzina');
    console.log(e.target.length);

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
      // it reloads page, and show that new post which was created
      mutate();
    } catch (error) {
      console.log(error);
    }

    for (let i = 0; i < e.target.length - 1; i++) {
      e.target[i].value = '';
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
                  <span title="Delete this post?" className={styles.delete}>
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
