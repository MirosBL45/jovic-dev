'use client';

// react/next stuff
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';
import Link from 'next/link';

// components
import ClickButton from '@/components/CustomInputs/Buttons/ClickButton';
import { TabTitle } from '@/utils/GeneralFunctions';
import PasswordInput from '@/components/CustomInputs/PasswordInput/PasswordInput';

// style
import styles from './page.module.css';

// icons
import GoogleIcon from 'public/google.svg';
import EMailIcon from 'public/email.png';

function Login() {
  // for tab title
  useEffect(() => {
    TabTitle('Login to Dashboard');
  }, []);

  const session = useSession();
  const router = useRouter();

  if (session.status === 'loading') {
    return (
      <p style={{ marginTop: '150px', fontSize: '25px' }}>Loading User...</p>
    );
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
    <main className={`${styles.container} layoutContainerAll`}>
      <header>
        <h1>Login to continue to the dashboard</h1>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className={styles.input}
          required
        />
        <PasswordInput />
        <ClickButton title={'Login with Mail'}>
          {'Login with'}
          <Image
            src={EMailIcon}
            alt="Mail"
            title="Login with mail - Jovic Miroslav, Frontend Developer"
            width={35}
            height={35}
          />
        </ClickButton>
      </form>
      <section className={styles.withRegister}>
        <ClickButton onClick={handleClick} title={'Or login with Google'}>
          {'Or login with'}
          <Image
            src={GoogleIcon}
            alt="Google"
            title="Login with Google - Jovic Miroslav, Frontend Developer"
            width={35}
            height={35}
          />
        </ClickButton>
        <Link href={'/dashboard/register'} title={`No account? Register here!`}>
          No account? Register here!
        </Link>
      </section>
    </main>
  );
}

export default Login;
