'use client';

// react/next stuff
import { signIn } from 'next-auth/react';

// components
import ClickButton from '@/components/Buttons/ClickButton';

// style
import styles from './page.module.css';

function Login() {
  function handleClick() {
    signIn('google');
  }

  return (
    <div className={styles.container}>
      <ClickButton onClick={handleClick}>{'Login with Google'}</ClickButton>
    </div>
  );
}

export default Login;
