import React, { useCallback, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../common/Sidebar";
import Auth from "../pages/Auth";
import Transactions from "../pages/Transactions";
import Calendar from "../pages/Calendar";
import Challenge from "../pages/Challenge";
import Community from "../pages/Community";
import Profile from "../pages/Profile";
import { useSelector } from "react-redux";
import CommunityEditor from "../components/Community/CommunityEditor";
import ContentView from "../components/Community/ContentView";

function AppRouter() {
  const userData = useSelector((state) => state.user);

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
