import React, { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
import { AiTwotoneCalendar } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { BiRun } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function MenuList() {
  const [currentLink, setCurrentLink] = useState(0);
  return (
    <ul>
      <li onClick={() => setCurrentLink(1)} className={currentLink === 1 ? "active" : "none"}>
        <Link to="/">
          <MdSpaceDashboard />
          <span> 대시보드</span>
        </Link>
      </li>

      <li onClick={() => setCurrentLink(2)} className={currentLink === 2 ? "active" : "none"}>
        <Link to="/transactions">
          <RiDashboard2Fill />
          <span> 수입/지출 내역</span>
        </Link>
      </li>
      {/* <li onClick={() => setCurrentLink(3)} className={currentLink === 3 ? "active" : "none"}>
        <Link to="/calendar">
          <AiTwotoneCalendar />
          <span> 캘린더</span>
        </Link>
      </li> */}
      <li onClick={() => setCurrentLink(5)} className={currentLink === 5 ? "active" : "none"}>
        <Link to="/challenge">
          <BiRun />
          <span> 챌린지</span>
        </Link>
      </li>
      <li onClick={() => setCurrentLink(6)} className={currentLink === 6 ? "active" : "none"}>
        <Link to="/community">
          <IoIosPeople />
          <span> 커뮤니티</span>
        </Link>
      </li>
      <li onClick={() => setCurrentLink(7)} className={currentLink === 7 ? "active" : "none"}>
        <Link to="/profile">
          <IoSettings />
          <span> 설정</span>
        </Link>
      </li>
    </ul>
  );
}
