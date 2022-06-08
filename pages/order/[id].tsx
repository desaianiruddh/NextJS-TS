import axios, { AxiosResponse } from 'axios';

import styles from '../../styles/Order.module.css';
import Image from 'next/image';
import { OrderData } from '../../model';
import { GetServerSideProps } from 'next';
interface props {
  order: OrderData;
}
const Order: React.FC<props> = ({ order }) => {
  const status = order.status;
  const { _id, customer, total, address, method } = order;
  const statusClass = (index: number) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>
                <td>
                  <span className={styles.id}>{_id}</span>
                </td>
                <td>
                  <span className={styles.name}>{customer}</span>
                </td>
                <td>
                  <span className={styles.address}>{address}</span>
                </td>
                <td>
                  <span className={styles.total}>Rs.{total}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src="/img/paid.png" width={30} height={30} alt="" />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/img/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/img/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/img/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>Rs. {order.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>Rs. 0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>Rs. {order.total}
          </div>
          <button disabled className={styles.button}>
            {method === 0 ? 'COD' : 'PAID'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let res: AxiosResponse<OrderData> = await axios.get(
    `${process.env.BASE_URL}/api/order/${params.id}`
  );
  return {
    props: { order: res.data },
  };
};

export default Order;
