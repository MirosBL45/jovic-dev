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
import Popup from '@/components/UIComponents/PopUp/PopUp';
import DeletePopUp from '@/components/UIComponents/PopUp/DeletePopUp';
import {
  areAllFieldsFilled,
  isInputLengthValid,
} from '@/utils/GeneralFunctions';

// style
import styles from './page.module.css';

// icons
import { IoCloseCircleOutline, IoImageOutline } from 'react-icons/io5';

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

  // PopUp model deleting post
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [slugToDelete, setSlugToDelete] = useState('');

  // PopUp models for loading images
  const [popupMessage1, setPopupMessage1] = useState(false);
  const [popupMessage2, setPopupMessage2] = useState(false);
  const [popupMessageEmpty, setPopupMessageEmpty] = useState(false);
  const [popupMessageRange, setPopupMessageRange] = useState(false);

  function handleClose() {
    setPopupMessage1(false);
    setPopupMessage2(false);
    setPopupMessageEmpty(false);
    setPopupMessageRange(false);
  }

  // for base64 image state
  const [imageBase64, setImageBase64] = useState('');
  const [imageBase64second, setImageBase64second] = useState('');

  // to show uploaded image
  const [renderedImage1, setRenderedImage1] = useState('');
  const [renderedImage2, setRenderedImage2] = useState('');

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
    e.preventDefault();

    // We take all input elements from the form, except the last one which is the submit button
    const formFields = Array.from(e.target.elements).slice(0, -1);

    if (!areAllFieldsFilled(formFields)) {
      setPopupMessageEmpty(true);
      return;
    }

    if (
      !isInputLengthValid(e.target[0].value, 2, 75) ||
      !isInputLengthValid(e.target[1].value, 2, 35) ||
      !isInputLengthValid(e.target[2].value, 2, 200) ||
      !isInputLengthValid(e.target[3].value, 2, 2000) ||
      !isInputLengthValid(e.target[5].value, 2, 35) ||
      !isInputLengthValid(e.target[6].value, 2, 200) ||
      !isInputLengthValid(e.target[7].value, 2, 2000) ||
      !isInputLengthValid(e.target[9].value, 2, 20)
    ) {
      // Error message if input is out of range
      setPopupMessageRange(true);
      return;
    }

    setButtonSend(true);

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
      // reset fields
      e.target.reset();
      setButtonSend(false);
      setRenderedImage1('');
      setRenderedImage2('');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(slug) {
    setSlugToDelete(slug);
    setShowConfirmation(true);
  }

  async function confirmDelete() {
    try {
      await fetch(`/api/posts/${slugToDelete}`, {
        method: 'DELETE',
      });
      // it reloads page, so we can see it after deleting post
      mutate();
    } catch (error) {
      console.log(error);
    } finally {
      // reset fields
      setSlugToDelete('');
      setShowConfirmation(false);
    }
  }

  function cancelDelete() {
    // reset fields
    setSlugToDelete('');
    setShowConfirmation(false);
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
      setRenderedImage1(reader.result);
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
      setRenderedImage2(reader.result);
    };
    reader.onerror = (err) => {
      console.log('Error with image: ', err);
    };
  }

  if (session.status === 'authenticated') {
    return (
      <>
        <header className="layoutContainerAll">
          <h1 className={styles.headline}>
            {buttonSend ? 'Sending This Post...' : 'Add New Post'}
          </h1>
        </header>
        <main className={styles.container}>
          <div className={styles.previousPosts}>
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
                        alt={`${post.title} - Miroslav Jovic, Frontend Developer`}
                        title={`${post.title} - Miroslav Jovic, Frontend Developer`}
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
              pattern=".{2,75}"
              title="String with min length of 2 and max length of 75 characters, that is about 10 words"
              required
              disabled={buttonSend && true}
            />
            <input
              type="text"
              placeholder="Headline 1"
              pattern=".{2,35}"
              title="String with min length of 2 and max length of 35 characters, that is about 6 words"
              required
              disabled={buttonSend && true}
            />
            <input
              type="text"
              placeholder="Description 1"
              pattern=".{2,200}"
              title="String with min length of 2 and max length of 200 characters, that is about 30 words"
              required
              disabled={buttonSend && true}
            />
            <textarea
              placeholder="Content 1"
              cols="30"
              rows="10"
              pattern=".{2,2000}"
              title="String with min length of 2 and max length of 2000 characters, that is about 280 words"
              required
              disabled={buttonSend && true}
            ></textarea>
            <div className={styles.forImage}>
              <p>
                {!renderedImage1
                  ? 'Add first image for the post:'
                  : 'Image added'}
              </p>
              <div className={styles.labelDiv}>
                <label htmlFor="image-upload1">
                  {!renderedImage1 ? 'Add image' : 'Change image'}
                  <IoImageOutline />
                </label>
                <input
                  id="image-upload1"
                  type="file"
                  accept="image/*"
                  onChange={convertToBase64}
                  required
                  disabled={buttonSend && true}
                />
              </div>
              {renderedImage1 && (
                <div className={styles.renderedImage}>
                  <Image
                    src={renderedImage1}
                    alt="Miroslav Jovic Frontend Developer"
                    title="Miroslav Jovic Frontend Developer"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Headline 2"
              pattern=".{2,35}"
              title="String with min length of 2 and max length of 35 characters, that is about 6 words"
              required
              disabled={buttonSend && true}
            />
            <input
              type="text"
              placeholder="Description 2"
              pattern=".{2,200}"
              title="String with min length of 2 and max length of 200 characters, that is about 30 words"
              required
              disabled={buttonSend && true}
            />
            <textarea
              placeholder="Content 2"
              cols="30"
              rows="10"
              pattern=".{2,2000}"
              title="String with min length of 2 and max length of 2000 characters, that is about 280 words"
              required
              disabled={buttonSend && true}
            ></textarea>
            <div className={styles.forImage}>
              <p>
                {!renderedImage2
                  ? 'Add second image for the post:'
                  : 'Image added'}
              </p>
              <div className={styles.labelDiv}>
                <label htmlFor="image-upload2">
                  {!renderedImage2 ? 'Add image' : 'Change image'}
                  <IoImageOutline />
                </label>
                <input
                  id="image-upload2"
                  type="file"
                  accept="image/*"
                  onChange={convertToBase64second}
                  required
                  disabled={buttonSend && true}
                />
              </div>
              {renderedImage2 && (
                <div className={styles.renderedImage}>
                  <Image
                    src={renderedImage2}
                    alt="Miroslav Jovic Frontend Developer"
                    title="Miroslav Jovic Frontend Developer"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Slug of the post"
              pattern=".{2,20}"
              title="String with min length of 2 and max length of 20 characters"
              required
              disabled={buttonSend && true}
            />
            <ClickButton
              title={buttonSend ? 'Sending This Post...' : 'Send New Post'}
              disabled={buttonSend}
            >
              {buttonSend ? 'Sending This Post...' : 'Send New Post'}
            </ClickButton>
          </form>
        </main>
        {/* <ScrollButton /> */}
        {popupMessage1 && (
          <Popup
            message="The first image is too large. Please select an image smaller than 2MB."
            onClose={handleClose}
            showPopup={popupMessage1}
          />
        )}
        {popupMessage2 && (
          <Popup
            message="The second image is too large. Please select an image smaller than 2MB."
            onClose={handleClose}
            showPopup={popupMessage2}
          />
        )}
        {popupMessageEmpty && (
          <Popup
            message="Fill all fileds!"
            onClose={handleClose}
            showPopup={popupMessageEmpty}
          />
        )}
        {popupMessageRange && (
          <Popup
            message="Match pattern for fileds!"
            onClose={handleClose}
            showPopup={popupMessageRange}
          />
        )}
        {showConfirmation && (
          <DeletePopUp
            cancelDelete={cancelDelete}
            confirmDelete={confirmDelete}
          />
        )}
      </>
    );
  }
}

export default Dashboard;
