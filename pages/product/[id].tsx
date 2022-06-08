import axios, { AxiosResponse } from 'axios';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addProduct } from '../../redux/cartSlice';
import styles from '../../styles/Product.module.css';
import { GetServerSideProps } from 'next';
import { ProductData } from '../../model';

interface props {
  pizza: ProductData;
}
interface Extras {
  text: string;
  price: number;
  _id: string;
}

const Product: React.FC<props> = ({ pizza }) => {
  const dispatch = useDispatch();
  const { title, desc, img, prices } = pizza;
  const [extras, setExtras] = useState<Extras[]>([]);
  const [price, setPrice] = useState<number>(prices[1]);
  const [size, setSize] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);

  const changePrice = (number: number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex: number) => {
    const difference = prices[sizeIndex] - prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    option: { text: string; price: any; _id: string }
  ) => {
    const checked: boolean = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };
  const handleClick = () => {
    if (quantity <= 0) {
      alert('Minimum quantity must be 1');
      setQuantity(1);
    } else {
      dispatch(addProduct({ ...pizza, extras, price, quantity }));
      alert(`${title} Added to the cart`);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.price}>Rs.{price}</span>
        {size === 0 && (
          <div className={styles.sizeText}>{' (Selected Size:- Small)'} </div>
        )}
        {size === 1 && (
          <div className={styles.sizeText}>{' (Selected Size:- Medium)'}</div>
        )}
        {size === 2 && (
          <div className={styles.sizeText}>{' (Selected Size:- Large)'}</div>
        )}
        <p className={styles.desc}>{desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            onChange={({ target }) => setQuantity(parseFloat(target.value))}
            type="number"
            value={quantity}
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res: AxiosResponse<ProductData> = await axios.get(
    `${process.env.BASE_URL}/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
};
