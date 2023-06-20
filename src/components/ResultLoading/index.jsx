import { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

import animationData from './loadingIcon.json';
import styles from './index.module.css';

export default function ResultLoading() {
  const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      animationData: animationData,
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div>
          <span className={styles.pointText}>나</span>
          <span>는...!</span>
        </div>
        <div>
          <div ref={containerRef} className={styles.loadImg}></div>
        </div>
      </div>
    </div>
  );
}
