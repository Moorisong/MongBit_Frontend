import axios from 'axios';
import { useEffect, useState } from 'react';

import TestPreview from '../../components/TestPreview';

export default function RandomTest() {
  const [thumbnailStr, setThumbnailStr] = useState('');
  const [playCnt, setPlayCnt] = useState(0);
  const [description, setDescription] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState('');
  const [testId, setTestId] = useState('');

  useEffect(() => {
    axios
      .get(`https://mongbit-willneiman.koyeb.app/api/v1/tests/random`)
      .then((res) => {
        console.log('d---> ', res.data);
        setThumbnailStr(res.data.title);
        setPlayCnt(res.data.playCount);
        setDescription(res.data.content);
        setThumbnailUri(res.data.imageUrl);
        setTestId(res.data.id);
      });
  }, []);

  if (!description) return <div>로딩중</div>;

  return (
    <>
      {description && (
        <TestPreview
          testId={testId}
          thumbnailStr={thumbnailStr}
          playCnt={playCnt}
          description={description}
          thumbnailUri={thumbnailUri}
        />
      )}
    </>
  );
}
