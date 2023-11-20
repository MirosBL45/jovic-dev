'use client';

// react/next stuff
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// components
import ClickButton from '@/components/Buttons/ClickButton';
import { TabTitle } from '@/utils/GeneralFunctions';

// style
import styles from './page.module.css';

function Register() {
  // for tab title
  useEffect(() => {
    TabTitle('Jovic-dev Register');
  }, []);

  // for base64 image state
  const [imageBase64, setImageBase64] = useState('');

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

  const [error, setError] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const avatar = imageBase64;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar,
        }),
      });

      res.status === 201 &&
        router.push('/dashboard/login?success=Account has been created');
    } catch (error) {
      setError(true);
    }
    e.target.reset();
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className={styles.input}
          required
        />
        <input
          type="email"
          placeholder="email"
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={convertToBase64}
          required
        />
        <ClickButton>{'Register'}</ClickButton>
      </form>
      {error && 'Something went wrong, there is an error'}
      <Link href={'/dashboard/login'}>Login with an existing account</Link>
    </div>
  );
}

export default Register;
