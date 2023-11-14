'use client';

// react/next stuff
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// components
import ClickButton from '@/components/Buttons/ClickButton';

// style
import styles from './page.module.css';

function Register() {
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
    e.target[0].value = '';
    e.target[1].value = '';
    e.target[2].value = '';
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
        <ClickButton>{'Register'}</ClickButton>
      </form>
      {error && 'Something went wrong!'}
      <Link href={'/dashboard/login'}>Login with an existing account</Link>
    </div>
  );
}

export default Register;
