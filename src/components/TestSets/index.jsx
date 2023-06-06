// import { useState } from 'react';
// import axios from 'axios'
import { CardButton, Stroke } from '../ButtonSets'
import { TestCard } from '../TestCard'
import styles from './index.module.css'

function TestSetComplete() {
  // const [data, setData] = useState([])
  const thumbnailStr = '우리집 묘르신 모색으로 알아보는 성격 파탄 테스트';

  // ajax 요청해서 데이터 가져오기, prop 적용하기

  // useEffect(() => {

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('')
  //       console.log('res--> ', response)
  //     }
  //     catch (err) {
  //       console.log('err--> ', err)
  //     }
  //   }

  //   setData(fetchData)

  // }, [])

  return (
    <div>
      <TestCard thumbnailStr={thumbnailStr} thumbnailClass='normal_thumbnail' titleBoxClass = 'normal_titleBox' />
      <div className={styles.buttonWrap}>
        <CardButton btnType='playCnt' />
        <CardButton btnType='likeCnt' />
        <CardButton btnType='commentCnt' />
        <Stroke />
      </div>
    </div>
  )
}


export { TestSetComplete }
