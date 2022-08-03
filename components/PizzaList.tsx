import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';
import { ProductData } from '../model';
interface props {
  pizzasListData: ProductData[];
}
const PizzaList: React.FC<props> = ({ pizzasListData }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA YOU'VE EVER TASTE</h1>
      <div className={styles.desc}>
        What is better than having a crispy melty pizza, you ask?
        <p>Having that crispy and melty pizza in the comfort of your</p>
        <p>own home with the ones you love, we say.</p>
      </div>
      <div className={styles.wrapper}>
        {pizzasListData.map((pizza) => {
          return <PizzaCard pizzaInfo={pizza} key={pizza._id} />;
        })}
      </div>
    </div>
  );
};

export default PizzaList;
