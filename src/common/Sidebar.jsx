import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VscNotebook } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import scrollreveal from "scrollreveal";
import MenuList from "./MenuList";
import { Link } from "react-router-dom";

export default function Sidebar({ userInfo, logoutAction }) {
  const [navbarState, setNavbarState] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavbarState(false));

  const handleLogout = () => {
    logoutAction();
  };

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
  return (
    <>
      <Section>
        <div className="top">
          <div className="brand">
            <Link to="/" style={{ textDecoration: "none" }}>
              <VscNotebook />
              <span>소셜 가계부</span>
            </Link>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose className="menu-btn" onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbarState(true);
                }}
              />
            )}
          </div>
          <div className="links">
            <MenuList />
          </div>
        </div>

        <div className="logout" onClick={handleLogout}>
          <FiLogOut />
          <span className="logout">logout</span>
        </div>
      </Section>
      <ResponsiveNav state={navbarState} className={navbarState ? "show" : ""}>
        <div className="responsive__links">
          <MenuList />
        </div>
        <div className="logout" onClick={handleLogout}>
          <FiLogOut />
          <span className="logout">logout</span>
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
      justify-content: center;
      align-items: center;
      gap: 2rem;

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
    &:hover {
      background-color: #f75c82;
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
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .top > .links,
    .logout {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
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
  .responsive__links {
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

  .logout {
    padding: 0.3rem 1rem;
    border-radius: 0.6rem;
    &:hover {
      background-color: #f75c82;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
  }
`;
