// import { useState } from 'react';
// import axios from 'axios'
import { CardButton, Stroke } from '../ButtonSets'
import { TestCard } from '../TestCard'
import styles from './index.module.css'

function TestSetComplete(props) {
  const thumbnailStr = '우리집 묘르신 모색으로 알아보는 성격 파탄 테스트';
  const cn_1 = props.type === 'inTestList' ? `${styles.move_testList}` : null

  return (
    <div className={cn_1}>
      <TestCard thumbnailStr={thumbnailStr} thumbnailClass='normal_thumbnail' titleBoxClass='normal_titleBox' />
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
