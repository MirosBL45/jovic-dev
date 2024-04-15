'use client';

// react/next stuff
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// components
import { TabTitle } from '@/utils/GeneralFunctions';
import ClickButton from '@/components/CustomInputs/Buttons/ClickButton';
import ScrollButton from '@/components/UIComponents/ScrollButton/ScrollButton';
import { BASE_API_URL } from '@/utils/constants';
import Popup1 from '@/components/UIComponents/PopUp/PopUp';
import Popup2 from '@/components/UIComponents/PopUp/PopUp';

// style
import styles from './page.module.css';

// icons
import { IoCloseCircleOutline } from 'react-icons/io5';

// function for catching data to see slugs
async function getAllPostSlugs() {
  const response = await fetch(`${BASE_API_URL}/api/posts`);
  const posts = await response.json();
  const slugs = posts.map((post) => post.slug);
  return slugs;
}

function Dashboard() {
  // for tab title
  useEffect(() => {
    TabTitle('Dashboard for your blogs');
  }, []);

  const session = useSession();
  const router = useRouter();

  // button sending text
  const [buttonSend, setButtonSend] = useState(false);

  // for PopUp model
  const [popupMessage1, setPopupMessage1] = useState(false);
  const handleClose1 = () => setPopupMessage1(false);
  const [popupMessage2, setPopupMessage2] = useState(false);
  const handleClose2 = () => setPopupMessage2(false);

  // for base64 image state
  const [imageBase64, setImageBase64] = useState('');
  const [imageBase64second, setImageBase64second] = useState('');

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // catch data of posts
  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  // check for url
  if (!BASE_API_URL) {
    return (
      <p style={{ marginTop: '150px', fontSize: '45px' }}>conection failed</p>
    );
  }

  if (session.status === 'loading') {
    return (
      <p style={{ marginTop: '150px', fontSize: '25px' }}>Loading User...</p>
    );
  }

  if (session.status === 'unauthenticated') {
    router?.push('/dashboard/login');
    return null;
  }

  async function handleSubmit(e) {
    setButtonSend(true);
    e.preventDefault();
    const title = e.target[0].value;
    const headline1 = e.target[1].value;
    const description1 = e.target[2].value;
    const content1 = e.target[3].value;
    const image = imageBase64;
    const headline2 = e.target[5].value;
    const description2 = e.target[6].value;
    const content2 = e.target[7].value;
    const imagesecond = imageBase64second;
    let slug = e.target[9].value.replace(/\s+/g, '_');

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
          headline1,
          description1,
          content1,
          image,
          headline2,
          description2,
          content2,
          imagesecond,
          slug,
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
    if (file.size > 2 * 1024 * 1024) {
      setPopupMessage1(true);
      e.target.value = '';
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

  function convertToBase64second(e) {
    const file = e.target.files[0];

    // check file size
    if (file.size > 2 * 1024 * 1024) {
      setPopupMessage2(true);
      e.target.value = '';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageBase64second(reader.result);
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
          <div>
            <h3>
              Your {'<'}previous{'>'} posts
            </h3>
            <aside className={styles.posts}>
              {isLoading ? (
                <p style={{ marginTop: '50px', fontSize: '25px' }}>
                  We are loading your posts, they are heavy, think about it...
                </p>
              ) : data && data.length ? (
                data.map((post) => (
                  <div className={styles.post} key={post._id}>
                    <div className={styles.imgContainer}>
                      <Image
                        src={post.image}
                        alt={`${post.title} - Jovic Miroslav, Frontend Developer`}
                        title={`${post.title} - Jovic Miroslav, Frontend Developer`}
                        width={0}
                        height={0}
                        sizes="100vw"
                      />
                    </div>
                    <h4>{post.title}</h4>
                    <span
                      onClick={() => handleDelete(post.slug)}
                      title="Delete this post?"
                      className={styles.delete}
                    >
                      <IoCloseCircleOutline />
                    </span>
                  </div>
                ))
              ) : (
                <div className={styles.displayed}>
                  When you make {'<'}your{'>'} first {'['}post{']'}, it will{' '}
                  {'{'}appear{'}'} here.
                </div>
              )}
            </aside>
          </div>
          <form className={styles.new} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Main Title"
              pattern=".{2,20}"
              title="String with min length of 2 and max length of 20 characters"
              required
            />
            <input
              type="text"
              placeholder="Headline 1"
              pattern=".{2,20}"
              title="String with min length of 2 and max length of 20 characters"
              required
            />
            <input
              type="text"
              placeholder="Description 1"
              pattern=".{2,200}"
              title="String with min length of 2 and max length of 200 characters, that is about 30 words"
              required
            />
            <textarea
              placeholder="Content 1"
              cols="30"
              rows="10"
              pattern=".{2,2000}"
              title="String with min length of 2 and max length of 2000 characters, that is about 280 words"
              required
            ></textarea>
            <div className={styles.forImage}>
              <p>Add first image for the post:</p>
              <input
                type="file"
                accept="image/*"
                onChange={convertToBase64}
                required
              />
            </div>

            <input
              type="text"
              placeholder="Headline 2"
              pattern=".{2,20}"
              title="String with min length of 2 and max length of 20 characters"
              required
            />
            <input
              type="text"
              placeholder="Description 2"
              pattern=".{2,200}"
              title="String with min length of 2 and max length of 200 characters, that is about 30 words"
              required
            />
            <textarea
              placeholder="Content 2"
              cols="30"
              rows="10"
              pattern=".{2,2000}"
              title="String with min length of 2 and max length of 2000 characters, that is about 280 words"
              required
            ></textarea>
            <div className={styles.forImage}>
              <p>Add second image for the post:</p>
              <input
                type="file"
                accept="image/*"
                onChange={convertToBase64second}
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
            <ClickButton title={'Send New Post'}>
              {buttonSend ? 'Sending This Post...' : 'Send New Post'}
            </ClickButton>
          </form>
        </main>
        <ScrollButton />
        {popupMessage1 && (
          <Popup1
            message="The first image is too large. Please select an image smaller than 2MB."
            onClose={handleClose1}
            showPopup={popupMessage1}
          />
        )}
        {popupMessage2 && (
          <Popup2
            message="The second image is too large. Please select an image smaller than 2MB."
            onClose={handleClose2}
            showPopup={popupMessage2}
          />
        )}
      </>
    );
  }
}

export default Dashboard;
