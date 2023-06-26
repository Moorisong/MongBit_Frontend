import { useNavigate } from 'react-router-dom';

import { CardButton, Stroke } from '../ButtonSets';
import { TestCard } from '../TestCard';
import {
  TYPE_TEST_LIST,
  TYPE_COMMENT_CNT,
  TYPE_PLAY_CNT,
  TYPE_LIKE_CNT,
} from '../../constants/constant';
import styles from './index.module.css';

function TestSetComplete(props) {
  const thumbnailStr = props.thumbnailStr;
  const cn_1 = props.type === TYPE_TEST_LIST ? `${styles.move_testList}` : null;

  return (
    <div className={cn_1}>
      <TestCard
        thumbnailStr={thumbnailStr}
        thumbnailUri={props.imageUrl}
        testId={props.testId}
      />
      <div className={styles.buttonWrap}>
        <CardButton type={TYPE_PLAY_CNT} data={props.playCount} />
        <CardButton type={TYPE_LIKE_CNT} data={props.likeCount} />
        <CardButton type={TYPE_COMMENT_CNT} data={props.commentCount} />
      </div>
      <Stroke type={props.type} />
    </div>
  );
}

function TestSetMyPage(props) {
  const navigate = useNavigate()
  return (
    <div className={styles.testCardWrap}>
      <TestCard
        type={props.type}
        thumbnailUri={props.imgUri}
        testId={props.testId}
        testResultId={props.testResultId}
      />
      <div
        className={styles.testCardTextWrap}
        onClick={() =>
          navigate(`/record/${props.testId}/${props.testResultId}`)
        }
      >
        <p>{props.title}</p>
        <p>{props.content.description}</p>
        <p>{props.content.date}</p>
      </div>
    </div>
  );
}

export { TestSetComplete, TestSetMyPage };
