'use client';

// react/next stuff
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';
import Link from 'next/link';

// components
import ClickButton from '@/components/Buttons/ClickButton';
import { TabTitle } from '@/utils/GeneralFunctions';

// style
import styles from './page.module.css';

// icons
import GoogleIcon from 'public/google.svg';
import EMailIcon from 'public/email.png';

function Login() {
  useEffect(() => {
    TabTitle('Jovic-dev Login');
  }, []);

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
      <h1>Login to continue to the dashboard</h1>
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
      <div className={styles.withRegister}>
        <ClickButton onClick={handleClick} title={'Or login with Google'}>
          {'Or login with'}
          <Image src={GoogleIcon} alt="Google" width={35} height={35} />
        </ClickButton>
        <Link href={'/dashboard/register'} title={`No account? Register here!`}>
          No account? Register here!
        </Link>
      </div>
    </div>
  );
}

export default Login;
