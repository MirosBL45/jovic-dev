'use client';

// react/next stuff
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// components
import ClickButton from '@/components/Buttons/ClickButton';
import { TabTitle } from '@/utils/GeneralFunctions';

// icons
import CheckList from 'public/checklist.png';

// style
import styles from './page.module.css';
import '@/app/globals.css';

function Register() {
  // for tab title
  useEffect(() => {
    TabTitle('Jovic-dev Register');
  }, []);

  const [error, setError] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

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
    <div className={`${styles.container} layoutContainerAll`}>
      <h1>Register to continue to the dashboard</h1>
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
        <ClickButton title={'Register'}>
          {'Register'}
          <Image src={CheckList} alt="CheckList" width={35} height={35} />
        </ClickButton>
      </form>
      {error && 'Something went wrong, there is an error'}
      <Link href={'/dashboard/login'}>Login with an existing account</Link>
    </div>
  );
}

export default Register;
