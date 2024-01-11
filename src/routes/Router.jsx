import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Sidebar from "../common/Sidebar";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import FriendListPage from "../pages/FriendListPage";
import AccountBookPage from "../pages/AccoutBookPage";
import CalendarPage from "../pages/CalendarPage";
import ChallengePage from "../pages/ChallengePage";
import CommunityPage from "../pages/CommuityPage";
import SettingPage from "../pages/SettingPage";
import LoadingIndicator from "../common/LoadingIndicator";

function AppRouter() {
  const [loginInfo, setloginInfo] = useState({
    authenticated: false,
    currentUser: "임시",
    loading: false,
  });

  if (loginInfo.loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Router>
        <Sidebar userInfo={loginInfo} />
        <Routes>
          <Route exact path="/" element={<Dashboard userInfo={loginInfo} />} />
          <Route path="/login" element={<LoginPage userInfo={loginInfo} />} />
          <Route path="/inex" element={<AccountBookPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/friendlist" element={<FriendListPage />} />
          <Route path="/challenge" element={<ChallengePage userInfo={loginInfo.currentUser} />} />
          <Route path="/community" element={<CommunityPage userInfo={loginInfo.currentUser} />} />
          <Route path="/setting" element={<SettingPage userInfo={loginInfo.currentUser} />} />
          <Route path="/signup" element={<SignUpPage userInfo={loginInfo} />} />
          <Route path="/login" element={<LoginPage userInfo={loginInfo} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
