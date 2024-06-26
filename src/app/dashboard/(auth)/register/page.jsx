'use client';

// react/next stuff
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// components
import ClickButton from '@/components/CustomInputs/Buttons/ClickButton';
import { TabTitle } from '@/utils/GeneralFunctions';
import PasswordInput from '@/components/CustomInputs/PasswordInput/PasswordInput';

// icons
import CheckList from 'public/checklist.png';

// style
import styles from './page.module.css';

function Register() {
  // for tab title
  useEffect(() => {
    TabTitle('Register for using Dashboard');
  }, []);

  const [error, setError] = useState(false);

  // button sending text
  const [buttonSend, setButtonSend] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    setButtonSend(true);
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

      setButtonSend(false);

      res.status === 201 &&
        router.push('/dashboard/login?success=Account has been created');
    } catch (error) {
      setError(true);
    }
    e.target.reset();
  }

  return (
    <main className={`${styles.container} layoutContainerAll`}>
      <header>
        <h1>Register to continue to the dashboard</h1>
      </header>
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
        <PasswordInput />
        <ClickButton
          title={'Register - Miroslav Jovic, Frontend Developer'}
          disabled={buttonSend}
        >
          {'Register'}
          <Image
            src={CheckList}
            alt="Register - Miroslav Jovic, Frontend Developer"
            title="Register - Miroslav Jovic, Frontend Developer"
            width={35}
            height={35}
          />
        </ClickButton>
      </form>
      {error && 'Something went wrong, there is an error'}
      <Link href={'/dashboard/login'}>Login with an existing account</Link>
    </main>
  );
}

export default Register;
