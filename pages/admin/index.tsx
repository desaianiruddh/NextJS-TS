import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { GetServerSideProps } from 'next';

import AddButton from '../../components/AddButton';
import AddNewPizza from '../../components/AddNewPizza';
import styles from '../../styles/Admin.module.css';
import { OrderData, ProductData } from '../../model';
interface props {
  orders: OrderData[];
  products: ProductData[];
}
const Index: React.FC<props> = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState<ProductData[]>(products);
  const [orderList, setOrderList] = useState<OrderData[]>(orders);
  const [close, setClose] = useState<boolean>(true);
  const status = ['preparing', 'on the way', 'delivered', 'completed'];
  const handleDelete = async (id: string): Promise<void> => {
    try {
      const res = await axios.delete(
        `${process.env.BASE_URL}/api/products/` + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id: string): Promise<void> => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    if (currentStatus < 3) {
      try {
        const res = await axios.put(`${process.env.BASE_URL}/api/order/` + id, {
          status: currentStatus + 1,
        });
        setOrderList([
          res.data,
          ...orderList.filter((order) => order._id !== id),
        ]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className={styles.addPizzaBtn}>
        <AddButton setClose={setClose} />
        {!close && <AddNewPizza setClose={setClose} />}
      </div>
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>Products</h1>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Image</th>
                <th>Id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </tbody>
            {pizzaList.map((product) => (
              <tbody key={product._id}>
                <tr className={styles.trTitle}>
                  <td>
                    <Image
                      src={product.img}
                      width={50}
                      height={50}
                      objectFit="cover"
                      alt=""
                    />
                  </td>
                  <td>{product._id.slice(-5)}</td>
                  <td>{product.title}</td>
                  <td>Rs.{product.prices[1]}</td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>Orders</h1>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Id</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </tbody>
            {orderList.map((order) => (
              <tbody key={order._id}>
                <tr className={styles.trTitle}>
                  <td>{order._id.slice(-8)}</td>
                  <td>{order.customer}</td>
                  <td>Rs.{order.total}</td>
                  <td>
                    {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                  </td>
                  <td>{status[order.status]}</td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => handleStatus(order._id)}
                    >
                      Next Stage
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';
  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
  const productRes = await axios.get(`${process.env.BASE_URL}/api/products`);
  const orderRes = await axios.get(`${process.env.BASE_URL}/api/order`);
  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
