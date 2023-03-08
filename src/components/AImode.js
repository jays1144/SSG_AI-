import "./AImode.css";
import axios from "axios";
import { useState } from "react";

const AImode = ({ onClose }) => {
  const [aimode, setAimode] = useState("");
  const [babo, setBabo] = useState("");
  const name = sessionStorage.getItem("name");

  const ai = function () {
    console.log("리듀스로 받아온값 :" + name);
    axios
      .post("http://127.0.0.1:3001/aimode", {
        tl_ai: babo,
        tl_name: name,
      })
      .then((result) => {
        setAimode(result.data.res);
        console.log(result.data.res);
        window.location.href = "http://localhost:3000/main-yoo1";
      })
      .catch((err) => {
        console.log("변경 안됨 : ", err);
      });
  };

  const del = function () {
    window.location.href = "http://localhost:3000/main-yoo1";
  };

  console.log(aimode);

  const ai_on = function () {
    setBabo("1");
    console.log("aion모드실행");
    document.getElementById("aidiv").style.backgroundColor = "green";
    document.getElementById("aidiv2").style.backgroundColor = "white";
    document.getElementById("on").style.color = "white";
    document.getElementById("off").style.color = "orangered";
  };

  const ai_off = function () {
    setBabo("0");
    console.log("aioff모드실행");
    document.getElementById("aidiv2").style.backgroundColor = "orangered";
    document.getElementById("aidiv").style.backgroundColor = "white";
    document.getElementById("off").style.color = "white";
    document.getElementById("on").style.color = "green";
  };

  return (
    <div className="aimode">
      <div className="aimode-child" />
      <div className="ai-mode">AI MODE</div>
      <div className="btn-card" onClick={ai}>
        <div className="btn-card-child" />
        <div className="registrar">변경</div>
      </div>
      <div className="btn-card1" onClick={del}>
        <div className="btn-card-child" />
        <div className="registrar">취소</div>
      </div>
      <div className="item-100px-fixed">
        <div className="fa">2FA</div>
        <img
          className="iconoutlinecheck-circle"
          alt=""
          src="../iconoutlinecheckcircle.svg"
        />
        <img className="iconresizeselector" alt="" />
      </div>
      <div className="tablestatus" id="aidiv2">
        <div className="return" onClick={ai_off} id="off">
          AI Mode OFF
        </div>
      </div>
      <div className="tablestatus1" id="aidiv">
        <div className="return" onClick={ai_on} id="on">
          AI MODE ON
        </div>
      </div>
    </div>
  );
};
export default AImode;
