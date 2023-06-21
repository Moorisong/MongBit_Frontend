import styles from './index.module.css';
import { InfoPart, QuestionPart, ResultPart } from '../TestAddElements';

export default function TestAdd() {
  return (
    <div className={styles.resultWrap}>
      <ResultPart />
    </div>
  );
}
