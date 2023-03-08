import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Add from "../components/Add";
import PortalPopup from "../components/PortalPopup";
import "./FrameComponent.css";

const FrameComponent = () => {
  const navigate = useNavigate();
  const [isAddOpen, setAddOpen] = useState(false);

  const onTextClick = useCallback(() => {
    navigate("/main-yoo1");
  }, [navigate]);

  const openAdd = useCallback(() => {
    setAddOpen(true);
  }, []);

  const closeAdd = useCallback(() => {
    setAddOpen(false);
  }, []);

  const onText2Click = useCallback(() => {
    navigate("/error");
  }, [navigate]);

  const onText3Click = useCallback(() => {
    navigate("/police");
  }, [navigate]);

  const onText4Click = useCallback(() => {
    navigate("/graf");
  }, [navigate]);

  const onText5Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <>
      <div className="navlogo-parent">
        <div className="navlogo4">
          <img className="iconlogo4" alt="" src="../iconlogo4.svg" />
        </div>
        <div className="div59" onClick={onTextClick}>
          메인 메뉴
        </div>
        <div className="div59" onClick={openAdd}>
          신호등 추가
        </div>
        <div className="div59" onClick={onText2Click}>{`이상 내역 `}</div>
        <div className="div59" onClick={onText3Click}>
          관할서 정보
        </div>
        <div className="div63" onClick={onText4Click}>
          그래프
        </div>
        <div className="div59" onClick={onText5Click}>
          로그아웃
        </div>
      </div>
      {isAddOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeAdd}
        >
          <Add onClose={closeAdd} />
        </PortalPopup>
      )}
    </>
  );
};

export default FrameComponent;
