import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import { Navigate } from "react-router-dom";

function OAuth2NavigateHandler() {
  let location = useLocation();
  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const token = getUrlParameter("token");
  const error = getUrlParameter("error");

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    return window.location.replace("/main");
  } else {
    return (
      <Navigate
        to={{
          pathname: "/login",
          state: {
            from: location,
            error: error,
          },
        }}
      />
    );
  }
}

export default OAuth2NavigateHandler;
