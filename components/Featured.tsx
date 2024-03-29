import { useState } from 'react';
import Image from 'next/image';

import styles from '../styles/Featured.module.css';
import { ReactNode } from 'react';

const Featured: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const images: String[] = [
    '/img/featured.png',
    '/img/featured2.png',
    '/img/featured3.png',
  ];

  const handleArrow = (direction: string): void => {
    if (direction === 'left') {
      setIndex(index !== 0 ? index - 1 : 2);
    } else if (direction === 'right') {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={():void => handleArrow('left')}
      >
        <Image src="/img/arrowl.png" alt="" layout="fill" objectFit="contain" />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img:String, index:number):ReactNode => (
          <div className={styles.imgContainer} key={index}>
            <Image src={img} alt="pizza" layout="fill" objectFit="contain" />
          </div>
        ))}
      </div>
      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={():void => handleArrow('right')}
      >
        <Image src="/img/arrowr.png" layout="fill" alt="" objectFit="contain" />
      </div>
    </div>
  );
};

export default Featured;
