'use client';

// react/next stuff
import { signIn } from 'next-auth/react';

// components
import ClickButton from '@/components/Buttons/ClickButton';

// style
import styles from './page.module.css';

function Login() {
  return (
    <div className={styles.container}>
      <button onClick={() => signIn('google')}>Login with Google</button>
      {/* <ClickButton onClick={() => signIn('google')}>
        {'Login with Google'}
      </ClickButton> */}
    </div>
  );
}

export default Login;
