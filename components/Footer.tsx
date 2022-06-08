import Image from 'next/image';

import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" objectFit="cover" layout="fill" alt="bg" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES, WE DID.THE PIZZA HUT'S PIZZA, WELL BAKED SLICE OF PIZZA.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            Pakwan Char Rasta #304.
            <br /> Ahmedabad, 85022
            <br /> 99**99****
          </p>
          <p className={styles.text}>
            Iscon Cross Road #235.
            <br /> Ahmedabad, 85022
            <br /> 99**99****
          </p>
          <p className={styles.text}>
            B Square-2 #104.
            <br /> Ahmedabad, 85022
            <br /> 99**99****
          </p>
          <p className={styles.text}>
            Thaltej Cross Road #125.
            <br /> Ahmedabad, 85022
            <br /> 99**99****
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
