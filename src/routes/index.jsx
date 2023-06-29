import { Routes, Route } from 'react-router-dom';

import Login from './Login';
import Main from './Main';
import TestList from './TestList';
import TestLatest from './TestLatest';
import Admin from './Admin';
import KakaoAuthHandle from './KakaoAuthHandle';
import MyPage from './MyPage';
import RandomTest from './RandomTest';
import TestOn from './TestOn';
import Result from './Result';
import PreviewTest from './PreviewTest/indxe';
import ViewOldResult from './ViewOldResult';
import NeedLogIn from './NeedLogIn';
import ExeptionPage from './ExceptionPage';
import DevInfo from './DevInfo';
import CoupangClick from '../components/CoupangClick';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/test/list" element={<TestList />} />
      <Route path="/test/latest" element={<TestLatest />} />
      <Route path="/test-random" element={<RandomTest />} />
      <Route path="/test-preview/:testId" element={<PreviewTest />} />
      <Route path="/test-on/:testId" element={<TestOn />} />
      <Route path="/before-result/:testId" element={<CoupangClick />} />
      <Route path="/result/:testId" element={<Result />} />
      <Route path="/record/:testId/:testResultId" element={<ViewOldResult />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/need-login" element={<NeedLogIn />} />
      <Route path="/exception" element={<ExeptionPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/devInfo" element={<DevInfo />} />
      <Route path="/login/oauth2/kakao/code" element={<KakaoAuthHandle />} />
    </Routes>
  );
}

export default Router;
