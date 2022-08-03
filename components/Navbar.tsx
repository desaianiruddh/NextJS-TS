import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { NextRouter, useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import styles from '../styles/Navbar.module.css';
import { State } from '../model';

const Navbar = () => {
  const [, , removeCookie] = useCookies(['token']);
  const { quantity }: { quantity: number } = useSelector(
    (state: State) => state.cart
  );
  const router: NextRouter = useRouter();
  const handleAdminLogout = (): void => {
    removeCookie('token', { path: '/' });
    router.push('/admin/login');
  };
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className="navbar-brand" href="#">
          <Image src="/img/logo.png" alt="logo" width="90px" height="69px" />
        </a>
      </Link>
      {router.pathname === '/admin' ? (
        <div className={styles.adminNavContainer}>
          <div className={styles.adminPanelHeaderText}>Admin Panel</div>
          <div>
            <button onClick={handleAdminLogout} className={styles.button}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.item}>
            <div className={styles.callButton}>
              <Image src="/img/telephone.png" alt="" width="32" height="32" />
            </div>
            <div className={styles.texts}>
              <div className={styles.text}>ORDER NOW!</div>
              <div className={styles.text}>800 055 5577</div>
            </div>
          </div>
          <div className={styles.item}>
            <Link href="/cart">
              <div className={styles.cart}>
                <Image src="/img/cart.png" alt="" width="30px" height="30px" />
                <div className={styles.counter}>{quantity}</div>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
