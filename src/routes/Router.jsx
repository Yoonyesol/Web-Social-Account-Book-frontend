import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../common/Sidebar";
import Auth from "../pages/Auth";
import Transaction from "../pages/Transaction";
import Calendar from "../pages/Calendar";
import Challenge from "../pages/Challenge";
import Community from "../pages/Community";
import Profile from "../pages/Profile";
import LoadingIndicator from "../common/LoadingIndicator";

function AppRouter() {
  const [userInfo, setuserInfo] = useState({
    authenticated: false,
    currentUser: "임시",
    loading: false,
  });

  if (userInfo.loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Router>
        <Sidebar userInfo={userInfo} />
        <Routes>
          <Route exact path="/" element={<Dashboard userInfo={userInfo} />} />
          <Route path="/authenticate" element={<Auth userInfo={userInfo} />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/challenge" element={<Challenge userInfo={userInfo.currentUser} />} />
          <Route path="/community" element={<Community userInfo={userInfo.currentUser} />} />
          <Route path="/community/new" element={<Community userInfo={userInfo.currentUser} />} />
          <Route path="/community/:cid" element={<Community userInfo={userInfo.currentUser} />} />
          <Route path="/profile" element={<Profile userInfo={userInfo.currentUser} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
