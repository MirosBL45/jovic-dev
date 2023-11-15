'use client';

// react/next stuff
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// components
import ClickButton from '@/components/Buttons/ClickButton';

// style
import styles from './page.module.css';

// icons
import GoogleIcon from 'public/google.svg';
import EMailIcon from 'public/email.png';

function Login() {
  const session = useSession();
  const router = useRouter();

  if (session.status === 'loading') {
    return <p>Loading User...</p>;
  }

  if (session.status === 'authenticated') {
    router?.push('/dashboard');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn('credentials', { email, password });
  }

  function handleClick() {
    signIn('google');
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <ClickButton title={'Login with Mail'}>
          {'Login with'}
          <Image src={EMailIcon} alt="Mail" width={35} height={35} />
        </ClickButton>
      </form>
      <ClickButton onClick={handleClick} title={'Or login with Google'}>
        {'Or login with'}
        <Image src={GoogleIcon} alt="Google" width={35} height={35} />
      </ClickButton>
    </div>
  );
}

export default Login;
