'use client';

// react/next stuff
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// components
import { TabTitle } from '@/utils/GeneralFunctions';
import ClickButton from '@/components/Buttons/ClickButton';

// style
import styles from './page.module.css';
import '@/app/globals.css';

// function for catching data to see slugs
async function getAllPostSlugs() {
  const response = await fetch('http://localhost:3000/api/posts');
  const posts = await response.json();
  const slugs = posts.map((post) => post.slug);
  return slugs;
}

function Dashboard() {
  // for tab title
  useEffect(() => {
    TabTitle('Jovic-dev Dashboard');
  }, []);

  const session = useSession();
  const router = useRouter();

  // button sending text
  const [buttonSend, setButtonSend] = useState(false);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // catch data of posts
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

  // for base64 image state
  const [imageBase64, setImageBase64] = useState('');

  async function handleSubmit(e) {
    setButtonSend(true);
    e.preventDefault();
    const title = e.target[0].value;
    const description = e.target[1].value;
    const image = imageBase64;
    let slug = e.target[3].value.replace(/\s+/g, '_');
    const content = e.target[4].value;

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

    slug = slug.toLowerCase();

    try {
      await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          image,
          slug,
          content,
          username: session.data.user.name,
        }),
      });
      // it reloads page, so we can see that new post which was created
      mutate();
      e.target.reset();
      setButtonSend(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(slug) {
    const userConfirmed = window.confirm('Delete this post?');

    if (userConfirmed) {
      try {
        await fetch(`/api/posts/${slug}`, {
          method: 'DELETE',
        });
        // it reloads page, so we can see it after deleting post
        mutate();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Deletion suspended!');
    }
  }

  function convertToBase64(e) {
    const file = e.target.files[0];

    // check file size
    if (file.size > 5 * 1024 * 1024) {
      alert('The image is too large. Please select an image smaller than 5MB.');
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageBase64(reader.result);
    };
    reader.onerror = (err) => {
      console.log('Error with image: ', err);
    };
  }

  if (session.status === 'authenticated') {
    return (
      <>
        <header className="layoutContainerAll">
          <h1 className={styles.headline}>Add New Post</h1>
        </header>
        <main className={styles.container}>
          <aside className={styles.posts}>
            {isLoading ? (
              'We are loading posts or users, think about it'
            ) : data && data.length ? (
              data.map((post) => (
                <div className={styles.post} key={post._id}>
                  <div className={styles.imgContainer}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={200}
                      height={100}
                    />
                  </div>
                  <h3>{post.title}</h3>
                  <span
                    onClick={() => handleDelete(post.slug)}
                    title="Delete this post?"
                    className={styles.delete}
                  >
                    X
                  </span>
                </div>
              ))
            ) : (
              <div className={styles.displayed}>
                When you make your first post, it will appear here.
              </div>
            )}
          </aside>
          <form className={styles.new} onSubmit={handleSubmit}>
            {/* <h1>Add New Post</h1> */}
            <input
              type="text"
              placeholder="Title"
              pattern=".{2,20}"
              title="String with min length of 2 and max length of 20 characters"
              required
            />
            <input
              type="text"
              placeholder="Description"
              pattern=".{2,200}"
              title="String with min length of 2 and max length of 200 characters"
              required
            />
            <div className={styles.forImage}>
              <p>Add image for the post:</p>
              <input
                type="file"
                accept="image/*"
                onChange={convertToBase64}
                required
              />
            </div>
            <input
              type="text"
              placeholder="Slug of the post"
              pattern=".{2,20}"
              title="String with min length of 2 and max length of 20 characters"
              required
            />
            <textarea
              placeholder="Content"
              cols="30"
              rows="10"
              pattern=".{2,2000}"
              title="String with min length of 2 and max length of 2000 characters, that is about 280 words"
              required
            ></textarea>
            <ClickButton title={'Send New Post'}>
              {buttonSend ? 'Sending This Post...' : 'Send New Post'}
            </ClickButton>
          </form>
        </main>
      </>
    );
  }
}

export default Dashboard;
