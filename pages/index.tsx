import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';

import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';
import styles from '../styles/Home.module.css';
import { ProductData } from '../model';
interface props {
  pizzasListData: ProductData[];
}
export default function Home({ pizzasListData }: props) {
  return (
    <div className={styles.container}>
      <Featured />
      <PizzaList pizzasListData={pizzasListData} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res: AxiosResponse<ProductData[]> = await axios.get(
    `${process.env.BASE_URL}/api/products`
  );
  return {
    props: {
      pizzasListData: res.data,
    },
  };
};
