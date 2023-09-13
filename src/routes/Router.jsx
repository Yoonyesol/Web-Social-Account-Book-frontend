import React, { useEffect, useState } from "react";
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
import OAuth2RedirectHandler from "../utils/OAuth2RedirectHandler";
import { getCurrentUser } from "../utils/APIUtils";
import { ACCESS_TOKEN } from "../constants";

function AppRouter() {
  const [loginInfo, setloginInfo] = useState({
    authenticated: false,
    currentUser: null,
    loading: true,
  });

  useEffect(() => {
    getCurrentUser()
      .then((response) => {
        setloginInfo({
          currentUser: response,
          authenticated: true,
          loading: false,
        });
      })
      .catch((error) => {
        setloginInfo({
          loading: false,
        });
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setloginInfo({
      authenticated: false,
      currentUser: null,
    });
    if (alert("로그아웃되었습니다.")) {
    }
    document.location.href = "/";
  };

  if (loginInfo.loading) {
    return <LoadingIndicator />;
  }
  return (
    <div>
      <Router>
        {loginInfo.authenticated ? <Sidebar userInfo={loginInfo} logoutAction={handleLogout} /> : <></>}
        <Routes>
          <Route exact path="/" element={<LoginPage userInfo={loginInfo} />} />
          <Route path="/main" element={<Dashboard userInfo={loginInfo} />} />
          <Route path="/inex" element={<AccountBookPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/friendlist" element={<FriendListPage />} />
          <Route path="/challenge" element={<ChallengePage userInfo={loginInfo.currentUser} />} />
          <Route path="/community" element={<CommunityPage userInfo={loginInfo.currentUser} />} />
          <Route path="/setting" element={<SettingPage userInfo={loginInfo.currentUser} />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />}></Route>
          <Route path="/signup" element={<SignUpPage userInfo={loginInfo} />} />
          <Route path="/login" element={<LoginPage userInfo={loginInfo} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
