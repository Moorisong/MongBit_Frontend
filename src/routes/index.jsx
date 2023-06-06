import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Main from "./Main";
import TestList from "./TestList";
import Test from "./Test"

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/test-list" element={<TestList />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default Router;
