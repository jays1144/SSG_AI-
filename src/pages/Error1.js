import "./Error1.css";
import "../components/style.css";
import Navs from "../components/Navs";
import Paginated from "../components/Paginated";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Error1 = () => {
  const [errorValue, setError] = useState([]);
  const name = sessionStorage.getItem("name");
  const location = useLocation();
  const who_post = location.state.value;
  console.log("who_post 값 : ", who_post);

  if (who_post == "one") {
    // 한 개의 신호등 에러 정보
    useEffect(() => {
      console.log("에러페이지 useEffect실행");
      axios
        .post("http://127.0.0.1:3001/error", {
          name: name,
        })
        .then((res) => {
          console.log("에러값 가져와짐", res.data.error);
          setError(res.data.error);
        })
        .catch((err) => {
          console.log("에러페이지 axios부분문제", err);
        });
    }, []);
  } else if (who_post == "all") {
    // 복수개의 신호등 정보
    useEffect(() => {
      console.log("에러페이지 useEffect실행");
      axios
        .post("http://127.0.0.1:3001/all_error")
        .then((res) => {
          console.log("에러값 가져와짐", res.data.error);
          setError(res.data.error);
        })
        .catch((err) => {
          console.log("에러페이지 axios부분문제", err);
        });
    }, []);
  }

  return (
    <div className="error1">
      <Navs />
      <div>
        <img className="close-icon" alt="" src="../03-close-icon.svg" />
      </div>
      <Paginated
        data={errorValue.map((num, cnt) => ({
          num: errorValue[cnt].num,
          error: errorValue[cnt].error,
          light: errorValue[cnt].tl_error,
          date: errorValue[cnt].date.substring(0, 10),
        }))}
        columns={[
          {
            accessor: "num",
            Header: "번호",
          },
          {
            accessor: "error",
            Header: "오류",
          },
          {
            accessor: "light",
            Header: "신호등",
          },
          {
            accessor: "date",
            Header: "날짜",
          },
        ]}
      />
      ;
    </div>
  );
};

export default Error1;
