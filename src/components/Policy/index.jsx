import { termsString } from './content';
import styles from './index.module.css';

export default function Policy(props) {
  return (
    <div className={styles.wrap}>
      <p className={styles.text}>{termsString}</p>
    </div>
  );
}
