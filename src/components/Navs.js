import React from "react";
import "./Navs.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Navs() {
  const navigate = useNavigate();

  const onMenuIconClick = useCallback(() => {
    navigate("/frame-39971");
  }, [navigate]);

  const onTextClick = useCallback(() => {
    navigate("/main-yoo1");
  }, [navigate]);

  const onText1Click = useCallback(() => {
    navigate("/graf");
  }, [navigate]);

  const onLogoutContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);
  return (
    <nav className="nav22">
      <div className="navlogo2" onClick={onTextClick}>
        <img className="iconlogo2" alt="" src="../iconlogo2.svg" />
      </div>
      <div className="navactions2">
        <button className="menu-icon2" onClick={onMenuIconClick}>
          <img className="vector-icon2" alt="" src="../vector.svg" />
        </button>
        <nav className="actions2">
          <nav className="group">
            <div className="div17" onClick={onTextClick}>
              메인화면
            </div>
            <div className="div18" onClick={onText1Click}>
              그래프
            </div>
          </nav>
          <div className="account2">
            <div className="name-container">
              <div className="logout2" onClick={onLogoutContainerClick}>
                <div className="div20">로그아웃</div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </nav>
  );
}

export default Navs;
