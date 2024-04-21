import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const LoadingIndicator = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  });

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!loading)
    return (
      <LoadingFail>
        <span>데이터 로딩에 실패했습니다. </span>
        <Button text="새로고침" type="button" onClick={handleRefresh} color="red" />
      </LoadingFail>
    );

  return (
    <Indicator>
      <div className="lds-dual-ring"></div>
    </Indicator>
  );
};

export default LoadingIndicator;

const Indicator = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;

  .lds-dual-ring {
    display: inline-block;
    width: 64px;
    height: 64px;
  }

  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #510077;
    border-color: #510077 transparent #510077 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingFail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  align-items: center;
`;
