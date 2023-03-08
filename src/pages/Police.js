import { useEffect, useState } from "react";
import "./Police.css";
import "../components/style.css";
import Navs from "../components/Navs";
import Paginated from "../components/Paginated";
import axios from "axios";

const Police = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    console.log("police페이지 useEffect실행");
    axios
      .post("http://127.0.0.1:3001/police")
      .then((res) => {
        console.log("police 가져와짐", res.data.police);
        setInfo(res.data.police);
      })
      .catch((err) => {
        console.log("police페이지 axios부분문제", err);
      });
  }, []);

  return (
    <div className="police">
      <Navs />
      <div>
        <img className="close-icon" alt="" src="../03-close-icon.svg" />
      </div>
      <Paginated
        data={info.map((num, cnt) => ({
          num: info[cnt].offi_num,
          name: info[cnt].offi_name,
          location: info[cnt].offi_location,
          phone: info[cnt].offi_phone,
        }))}
        columns={[
          {
            accessor: "num",
            Header: "번호",
          },
          {
            accessor: "name",
            Header: "이름",
          },
          {
            accessor: "location",
            Header: "위치",
          },
          {
            accessor: "phone",
            Header: "연락처",
          },
        ]}
      />
      ;
    </div>
  );
};

export default Police;
