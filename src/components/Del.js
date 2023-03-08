import { useCallback, useState } from "react";
import "./Del.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Del = ({ onClose }) => {
  const name = sessionStorage.getItem("name");
  const [key, setKey] = useState("");
  const onBtnCardContainerClick = useCallback(() => {
    window.location.href = "http://localhost:3000/main-yoo1";
  });

  const onBtnCardContainer1Click = useCallback(() => {
    if (key == "123456") {
      axios
        .post("http://127.0.0.1:3001/del", {
          name: name,
          key: key,
        })
        .then((res) => {
          console.log("삭제성공 : ", res.data.suc);
        })
        .catch((err) => {
          console.log("삭제axios문제 발생 : ", err);
        });
      window.location.href = "http://localhost:3000/main-yoo1";
    }
  });

  return (
    <div className="del">
      <div className="del-child" />
      <div className="div15">확인</div>
      <div className="div16">삭제하시겠습니까?</div>
      <div className="input-field4">
        <img className="search-icon4" alt="" src="../16-search-icon1.svg" />
        <input
          className="your-text-here4"
          placeholder="관리자 인증코드"
          type="password"
          onChange={(e) => setKey(e.target.value)}
        />
        <img className="search-icon4" alt="" src="../03-close-icon1.svg" />
      </div>
      <div className="btn-card4" onClick={onBtnCardContainerClick}>
        <div className="btn-card-child1" />
        <div className="registrar4">아니요</div>
      </div>
      <div className="btn-card5" onClick={onBtnCardContainer1Click}>
        <div className="btn-card-child1" />
        <div className="registrar5">삭제</div>
      </div>
    </div>
  );
};

export default Del;
