import { Routes, Route } from 'react-router-dom';

import Login from './Login';
import Main from './Main';
import TestList from './TestList';
import TestRandom from './TestRandom';
import Admin from './Admin';
import KakaoAuthHandle from './KakaoAuthHandle';
import MyPage from './MyPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/test-list" element={<TestList />} />
      <Route path="/test-random" element={<TestRandom />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login/oauth2/kakao/code" element={<KakaoAuthHandle />} />
    </Routes>
  );
}

export default Router;
