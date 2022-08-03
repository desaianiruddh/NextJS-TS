import styles from '../styles/OrderDetail.module.css';
import { CustomerData } from '../model';
import { ChangeEvent, Dispatch } from 'react';
import { SetStateAction } from 'react';
interface props {
  customerData: CustomerData;
  setCustomerData: Dispatch<SetStateAction<CustomerData>>;
  setClickedCheckout: Dispatch<SetStateAction<boolean>>;
  setShowPaymentOpt: Dispatch<SetStateAction<boolean>>;
}
const OrderDetail: React.FC<props> = ({
  setCustomerData,
  customerData,
  setClickedCheckout,
  setShowPaymentOpt,
}) => {
  const { name, mobileNum, address } = customerData;
  const handleInputField = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomerData((data) => {
      return { ...data, [name]: value };
    });
  };
  const handleDataAdd = () => {
    const mobileNumRegex = /^([0|+[0-9]{1,5})?([6-9][0-9]{9})$/;
    if (name !== '' && mobileNum !== '' && address !== '') {
      if (!mobileNumRegex.test(mobileNum)) {
        alert('Only Indian Mobile Number is valid');
      } else {
        setClickedCheckout(false);
        setShowPaymentOpt(true);
      }
    } else {
      alert('All the input field is compulsory');
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Add Delivery Address & Contact Detail</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name Surname</label>
          <input
            placeholder="John Doe"
            type="text"
            className={styles.input}
            name="name"
            onChange={(e) => handleInputField(e)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="number"
            name="mobileNum"
            placeholder="+1 234 567 89"
            className={styles.input}
            onChange={(e) => handleInputField(e)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            name="address"
            placeholder="Elton St. 505 NY"
            className={styles.textarea}
            onChange={(e) => handleInputField(e)}
          />
        </div>
        <button className={styles.button} onClick={handleDataAdd}>
          Payment Option
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
