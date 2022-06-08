import axios from 'axios';
import { NextRouter, useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import styles from '../../styles/Login.module.css';

const Login: React.FC = () => {
  const [cookies] = useCookies(['token']);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const router: NextRouter = useRouter();
  useEffect(() => {
    if (cookies) {
      router.push('/admin');
    }
  }, [cookies]);
  const handleClick = async (): Promise<void> => {
    try {
      await axios.post(
        `${process.env.BASE_URL}/api/login/admin`,
        {
          username,
          password,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      router.push('/admin');
      setUsername('');
      setPassword('');
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          placeholder="username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="false"
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="false"
        />
        <button onClick={handleClick} className={styles.button} type="button">
          Sign In
        </button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </form>
    </div>
  );
};

export default Login;
