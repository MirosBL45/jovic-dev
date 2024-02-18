'use client';

// react/next stuff
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// style
import styles from './passwordInput.module.css';

function PasswordInput() {
  const [seePassword, setSeePassword] = useState(false);

  return (
    <div className={styles.passwordHolder}>
      <input
        type={seePassword ? 'text' : 'password'}
        placeholder="password"
        className={styles.input}
        required
      />
      <span
        className={styles.eyeIcon}
        onClick={() => {
          setSeePassword(!seePassword);
        }}
      >
        {seePassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
}

export default PasswordInput;
