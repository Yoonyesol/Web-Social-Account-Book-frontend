import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../common/Sidebar";
import Auth from "../pages/Auth";
import Transactions from "../pages/Transactions";
import Calendar from "../pages/Calendar";
import Challenge from "../pages/Challenge";
import Community from "../pages/Community";
import Profile from "../pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import CommunityEditor from "../components/Community/CommunityEditor";
import ContentView from "../components/Community/ContentView";
import { loginSuccess, logout, setToken, setTokenExpiration, setUserInfo } from "../modules/user";
import LoadingIndicator from "../common/LoadingIndicator";
import { purge } from "../constants/function";
import { RootState } from "../modules/rootReducer";
import { UserEntity } from "../types";

function AppRouter() {
  const [isLoading, setIsLoading] = useState(true);
  const userData: UserEntity = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = useCallback(async () => {
    dispatch(logout());
    await setTimeout(() => purge(), 200);
  }, [dispatch]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("root") || "{}");
    if (storedData && storedData.token && new Date(storedData.tokenExpiration) > new Date()) {
      dispatch(loginSuccess());
      dispatch(setUserInfo(storedData.userInfo));
      dispatch(setToken(storedData.token));
      dispatch(setTokenExpiration(storedData.tokenExpiration));
    }

    setIsLoading(false);
  }, [logoutHandler, dispatch]);

  useEffect(() => {
    let logoutTimer: ReturnType<typeof setTimeout>;
    //토큰과 만료기간 둘 다 있으면 타이머 설정
    if (userData.token && userData.tokenExpiration) {
      const remainingTime = new Date(userData.tokenExpiration).getTime() - new Date().getTime(); //남은 만료기간
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    }
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer); //진행 중인 타이머 모두 제거
      }
    };
  }, [logoutHandler, userData.token, userData.tokenExpiration]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Router>
      {userData.token && <Sidebar />}
      <Routes>
        {userData.token ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/new" element={<CommunityEditor />} />
            <Route path="/community/:cid" element={<ContentView />} />
            <Route path="/community/:cid/edit" element={<CommunityEditor />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="*" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
}

export default AppRouter;
