import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../common/Sidebar";
import Auth from "../pages/Auth";
import Transactions from "../pages/Transactions";
import Calendar from "../pages/Calendar";
import Challenge from "../pages/Challenge";
import Community from "../pages/Community";
import Profile from "../pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import CommunityEditor, { EditCommunityPost } from "../components/Community/CommunityEditor";
import ContentView from "../components/Community/ContentView";
import { loginSuccess, logout, setToken, setTokenExpiration, setUserInfo } from "../modules/user";
import LoadingIndicator from "../common/LoadingIndicator";
import { purge } from "../constants/function";
import { RootState } from "../modules/rootReducer";
import { UserEntity } from "../types";
import CommunitySearchResult from "../pages/CommunitySearchResult";

function RequireAuth({ authenticated }: { authenticated: boolean }) {
  const location = useLocation();
  return authenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}

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

  const authenticated = Boolean(userData.token);
  const communityKey = authenticated ? "member" : "guest";

  return (
    <Router>
      {userData.token && <Sidebar />}
      <Routes>
        <Route path="/" element={authenticated ? <Dashboard /> : <Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/community" element={<Community key={communityKey} />} />
        <Route path="/community/search/:option/:keyword" element={<CommunitySearchResult key={communityKey} />} />
        <Route path="/community/:cid" element={<ContentView key={communityKey} />} />
        <Route element={<RequireAuth authenticated={authenticated} />}>
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/community/new" element={<CommunityEditor />} />
          <Route path="/community/:cid/edit" element={<EditCommunityPost />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
