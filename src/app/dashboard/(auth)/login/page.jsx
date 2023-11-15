'use client';

// react/next stuff
import { signIn } from 'next-auth/react';

// components
import ClickButton from '@/components/Buttons/ClickButton';

// style
import styles from './page.module.css';

function Login() {
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
        <ClickButton>{'Login'}</ClickButton>
      </form>
      <ClickButton onClick={handleClick}>{'Login with Google'}</ClickButton>
    </div>
  );
}

export default Login;
