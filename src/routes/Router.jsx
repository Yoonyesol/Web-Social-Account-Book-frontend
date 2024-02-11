import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../common/Sidebar";
import Auth from "../pages/Auth";
import Transactions from "../pages/Transactions";
import Calendar from "../pages/Calendar";
import Challenge from "../pages/Challenge";
import Community from "../pages/Community";
import Profile from "../pages/Profile";
import LoadingIndicator from "../common/LoadingIndicator";
import { useSelector } from "react-redux";
import CommunityEditor from "../components/Community/CommunityEditor";
import ContentView from "../components/Community/ContentView";

function AppRouter() {
  //로그인 시 리덕스 저장소에서 사용자 정보 가져옴
  const userInfo = useSelector((state) => state.user.userInfo);
  const loggedIn = useSelector((state) => state.user.isLoggedIn);

  if (userInfo === null && loggedIn) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Router>
        {loggedIn && <Sidebar />}
        <Routes>
          <Route path="/" element={loggedIn ? <Dashboard /> : <Auth />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/new" element={<CommunityEditor />} />
          <Route path="/community/:cid" element={<ContentView />} />
          <Route path="/community/edit/:cid" element={<CommunityEditor />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
