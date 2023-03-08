import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const [key2, setKey2] = useState("");
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  const enter = function () {
    if (window.event.keyCode == 13) {
      log();
    }
  };

  const log = function () {
    console.log("입력한 값 : ", key);
    axios
      .post("http://127.0.0.1:3001/log", {
        key: key,
      })
      .then((res) => {
        console.log("로그인 성공 : ", res);
        console.log(res.data.key, "관리자key값");
        console.log("여기서 뭐나오니 : ", res);

        if (res.data.key == key) {
          setKey2("");
          window.location.href = "http://localhost:3000/main-yoo1";
        } else {
          setKey2(res.data.error);
        }
      })
      .catch((err) => {
        console.log("에러페이지 axios부분문제", err);
      });
  };

  return (
    <div className="login" data-animate-on-scroll>
      <div className="frame-parent3">
        <div className="rectangle-wrapper">
          <img
            className="frame-child"
            alt=""
            src="../rectangle-55@2x.png"
            data-animate-on-scroll
          />
        </div>
        <div className="frame-wrapper">
          <div className="ssg-3-parent">
            <img className="ssg-3-icon" alt="" src="../ssg-3@2x.png" />
            <TextField
              className="input-field5"
              sx={{ width: 386 }}
              color="primary"
              variant="outlined"
              type="password"
              label="관리자인증코드"
              placeholder="Password를 입력하세요."
              size="medium"
              margin="none"
              onChange={(e) => setKey(e.target.value)}
              onKeyUp={enter}
            />
            <button className="filled-button" onClick={log}>
              <img className="plus-icon" alt="" src="../04-plus-icon.svg" />
              <b className="button">로그인</b>
              <img
                className="plus-icon"
                alt=""
                src="../10-down-chevron-icon.svg"
              />
            </button>
            <div className="gg">{key2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
