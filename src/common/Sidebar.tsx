import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { VscNotebook } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import scrollreveal from "scrollreveal";
import MenuList from "./MenuList";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../modules/user";
import { useDispatch } from "react-redux";
import { purge } from "../constants/function";

function Sidebar() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [navbarState, setNavbarState] = useState(false);

  const html = document.querySelector("html");
  html!.addEventListener("click", () => setNavbarState(false));

  const handleLogout = useCallback(async () => {
    dispatch(logout());
    await setTimeout(() => purge(), 200);
    alert("로그아웃되었습니다!");
    nav("/", { replace: true });
  }, [dispatch, nav]);

  useEffect(() => {
    const sr = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(
      `.brand, 
    .links>ul>li:nth-of-type(1),
    .links>ul>li:nth-of-type(2),
    .links>ul>li:nth-of-type(3),
    .links>ul>li:nth-of-type(4),
    .links>ul>li:nth-of-type(5),
    .links>ul>li:nth-of-type(6),
    .links>ul>li:nth-of-type(7),
    .logout
    `,
      {
        opacity: 0,
        interval: 300,
      },
    );
  }, []);

  const handleClickNavbar = useCallback((e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setNavbarState(true);
  }, []);

  return (
    <>
      <Section>
        <div className="top">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="brand">
              <VscNotebook />
              <span>소셜 가계부</span>
            </div>
          </Link>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose className="menu-btn" onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu onClick={handleClickNavbar} />
            )}
          </div>
          <div className="links">
            <MenuList />
          </div>
        </div>
        <div className="logout" onClick={handleLogout}>
          <FiLogOut />
          logout
        </div>
      </Section>

      <ResponsiveNav state={navbarState} className={navbarState ? "show" : ""}>
        <div className="responsive-links">
          <MenuList />
        </div>
        <div className="responsive-logout" onClick={handleLogout}>
          <FiLogOut />
          logout
        </div>
      </ResponsiveNav>
    </>
  );
}

const Section = styled.section`
  position: fixed;
  left: 0;
  background-color: #8b8fc8;
  height: 100vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;

  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    .toggle {
      display: none;

      svg {
        cursor: pointer;
      }
    }

    .brand {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;

      svg {
        color: #e5dae8;
        font-size: 2rem;
      }
      span {
        font-size: 2rem;
        color: #e5dae8;
        font-family: "Gowun Batang", serif;
        &:hover {
          cursor: pointer;
        }
      }
    }

    .links {
      display: flex;
      justify-content: center;
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        li {
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          &:hover {
            background-color: #6369bd;
            a {
              color: white;
            }
          }
          a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: white;
          }
        }
        .active {
          background-color: #6369bd;
          a {
            color: white;
          }
        }
      }
    }
  }

  .logout {
    padding: 0.3rem 1rem;
    border-radius: 0.6rem;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    &:hover {
      cursor: pointer;
      background-color: #6369bd;
      color: white;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    .top {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .toggle {
        display: block;
        color: black;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }

      .brand {
        justify-content: flex-start;

        span {
          font-size: 1.5rem;
        }
      }
    }
    .top > .links,
    .logout {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div<{ state: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  right: -10vw;
  top: 0;
  z-index: 20;
  background-color: #6369bd;
  height: 100vh;
  width: ${(state) => (state ? "60%" : "0%")};
  transition: 0.4s ease-in-out;
  opacity: 0;
  visibility: hidden;
  padding: 1rem;
  .responsive-links {
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 3rem;
      li {
        padding: 0.6rem 1rem;
        border-radius: 0.6rem;
        &:hover {
          background-color: #e1d0ff;
          a {
            color: black;
          }
        }
        a {
          text-decoration: none;
          display: flex;
          gap: 1rem;
          color: white;
        }
      }
      .active {
        background-color: #e1d0ff;
        a {
          color: black;
        }
      }
    }
  }

  .responsive-logout {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    border-radius: 0.6rem;
    color: white;
    &:hover {
      cursor: pointer;
      background-color: #e1d0ff;
      color: black;
    }
  }
`;

export default Sidebar;
