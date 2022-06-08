import { Dispatch, SetStateAction } from 'react';
import styles from '../styles/AddPizza.module.css';

interface props {
  setClose: Dispatch<SetStateAction<boolean>>;
}
const AddButton: React.FC<props> = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
      Add New Pizza
    </div>
  );
};

export default AddButton;
