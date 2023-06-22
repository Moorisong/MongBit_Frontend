import { useEffect, useState } from 'react';

import styles from './index.module.css';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import ResultLoading from '../../components/ResultLoading';
import TestResult from '../../components/TestResult';

export default function Result() {
  const [isLoading, setIsLoading] = useState(true);
  const [resultData, SetResultData] = useState({
    titleStr: '내게 3초만 줘. 다 잊어줄테니. 붕어!',
    contentStr: [
      '뒤끝이 뭐에요?',
      '그게 나 먹고 사는 데에 신경 써야 할 일이야?',
      '현실적이지 않다면 굳이 생각하지 않아요.',
      '자존감 하나만큼은 최고!',
      '한 번 결정한 건 더는 생각하지 않아요',
      '사실 그냥 남한테 관심이 별로 없는 거예요',
    ],
    likeCnt: '22',
  });
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  // useEffect(()=>{
  //   SetResultData((prev)=> ({...prev, titleStr: sessionStorage.getItem('mbT_title'), contentStr: sessionStorage.getItem('mbT_content'), imgUri=sessionStorage.getItem('mbT_imgUri')}))
  // }, [])
  return (
    <div className={styles.wrap}>
      <div className={styles.bgWhite}>
        <NavigationBar />
      </div>
      {isLoading && <ResultLoading />}
      {isLoading || (
        <TestResult
          titleStr={resultData.titleStr}
          contentStr={resultData.contentStr}
          likeCnt={resultData.likeCnt}
        />
      )}

      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        {isLoading && <Footer />}
      </div>
    </div>
  );
}
