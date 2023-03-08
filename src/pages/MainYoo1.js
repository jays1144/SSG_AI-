import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AImode from "../components/AImode";
import React, { useEffect } from "react";
import PortalPopup from "../components/PortalPopup";
import Del from "../components/Del";
import Add from "../components/Add";
import "./MainYoo1.css";
import "./Map_basic.css";
import axios from "axios";
import Navs from "../components/Navs";

const MainYoo1 = () => {
  const navigate = useNavigate();
  const [isAImodeOpen, setAImodeOpen] = useState(false);
  const [isDelOpen, setDelOpen] = useState(false);
  const [isAddOpen, setAddOpen] = useState(false);
  const [data, setData] = useState([]);

  const [problem, setProblem] = useState([
    {
      error_name: " ",
      error_date: " ",
    },
  ]);
  // 사진 뽑을거에요
  let bytes, blob;

  // 맵관련useState
  const [info, setInfo] = useState([]);
  const [map, setMap] = useState(null);
  let cnt = [];
  let positions = [];
  let ClickOverlay = null;
  const { kakao } = window;

  // 거리구하기
  // 관할서
  const [off, setOff] = useState([]);
  // 관할서 이름
  const [offName, setOffName] = useState("");
  const [offlocation, setOfflocation] = useState("");

  // 날씨api
  const [temperature, setTemperature] = useState(0.0); // 기온
  var tem_v;
  const [rainfall, setRainfall] = useState(0.0); // 강수량
  var rain_v;
  const [humidity, setHumidity] = useState(0.0); // 습도
  var hum_v;
  const [wind_speed, setWind_speed] = useState(0.0); // 풍속
  var wind_v;
  var x_v = 56;
  var y_v = 71;
  var year_v;
  var mon_v;
  var day_v;
  var api_v;
  // 위도 경도 --> 격자

  var RE = 6371.00877; // 지구 반경(km)
  var GRID = 5.0; // 격자 간격(km)
  var SLAT1 = 30.0; // 투영 위도1(degree)
  var SLAT2 = 60.0; // 투영 위도2(degree)
  var OLON = 126.0; // 기준점 경도(degree)
  var OLAT = 38.0; // 기준점 위도(degree)
  var XO = 43; // 기준점 X좌표(GRID)
  var YO = 136; // 기1준점 Y좌표(GRID)

  // LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )

  // 날씨 api 정보 가져오는 함수
  async function take_weather() {
    const fetch_return = await fetch(
      "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=ijptq5HCB%2BwzblMB1GNwUua4XA2GgPpZOuMOVufoeir2eMQcZBb6YePcCIbGzpN0Jkrx0AXf9Ggz1IvxZJa1aw%3D%3D&" +
        "pageNo=1&numOfRows=10&dataType=JSON&base_date=" +
        year_v +
        mon_v +
        day_v +
        "&base_time=" +
        api_v +
        "00&nx=" +
        x_v +
        "&ny=" +
        y_v
    );

    const fetch_json = await fetch_return.json();
    var fetch_datas = fetch_json.response.body.items.item;
    tem_v = fetch_datas[3].obsrValue;
    console.log("temp : ", tem_v);
    hum_v = fetch_datas[1].obsrValue;
    console.log("humi : ", hum_v);
    wind_v = fetch_datas[7].obsrValue;
    console.log("wind : ", wind_v);
    rain_v = fetch_datas[2].obsrValue;
    console.log("rain : ", rain_v);
    setTemperature(tem_v);
    setHumidity(hum_v);
    setRainfall(rain_v);
    setWind_speed(wind_v);
  }

  function ck_today() {
    console.log("ck_today 실행");
    var now = new Date();
    year_v = now.getFullYear().toString();
    if (now.getMonth() + 1 < 10) {
      mon_v = "0" + (now.getMonth() + 1);
    } else {
      mon_v = now.getMonth() + 1;
    }
    if (now.getDate() < 10) {
      day_v = "0" + now.getDate();
    } else {
      day_v = now.getDate();
    }
    var get_hour = now.getHours();

    if (parseInt(get_hour / 3) * 3 < 10) {
      api_v = "0" + parseInt(get_hour / 3) * 3;
    } else {
      api_v = parseInt(get_hour / 3) * 3;
    }
    console.log("ck_today 종료");
  }

  function dfs_xy_conv(code, v1, v2) {
    console.log("dfs 시작");
    var DEGRAD = Math.PI / 180.0;
    var RADDEG = 180.0 / Math.PI;

    var re = RE / GRID;
    var slat1 = SLAT1 * DEGRAD;
    var slat2 = SLAT2 * DEGRAD;
    var olon = OLON * DEGRAD;
    var olat = OLAT * DEGRAD;

    var sn =
      Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
      Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);
    var rs = {};
    if (code == "toXY") {
      rs["lat"] = v1;
      rs["lng"] = v2;
      var ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
      ra = (re * sf) / Math.pow(ra, sn);
      var theta = v2 * DEGRAD - olon;
      if (theta > Math.PI) theta -= 2.0 * Math.PI;
      if (theta < -Math.PI) theta += 2.0 * Math.PI;
      theta *= sn;
      rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
      rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
      x_v = rs["x"];
      y_v = rs["y"];
    } else {
      rs["x"] = v1;
      rs["y"] = v2;
      var xn = v1 - XO;
      var yn = ro - v2 + YO;
      ra = Math.sqrt(xn * xn + yn * yn);
      if (sn < 0.0) -ra;
      var alat = Math.pow((re * sf) / ra, 1.0 / sn);
      alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

      if (Math.abs(xn) <= 0.0) {
        theta = 0.0;
      } else {
        if (Math.abs(yn) <= 0.0) {
          theta = Math.PI * 0.5;
          if (xn < 0.0) -theta;
        } else theta = Math.atan2(xn, yn);
      }
      var alon = theta / sn + olon;
      rs["lat"] = alat * RADDEG;
      rs["lng"] = alon * RADDEG;
    }
    console.log("dfs 종료");
  }
  // 박민진 close  =======================================================================================================

  const onMoreErrorContainerClick = useCallback(() => {
    navigate("/error", { state: { value: "one" } });
  }, [navigate]);

  const onMoreErrorContainerClick2 = useCallback(() => {
    navigate("/all_error", { state: { value: "all" } });
  }, [navigate]);

  const onMorePoliceContainerClick = useCallback(() => {
    navigate("/police");
  }, [navigate]);

  const openAImode = useCallback(() => {
    setAImodeOpen(true);
  }, []);

  const closeAImode = useCallback(() => {
    setAImodeOpen(false);
  }, []);

  const openDel = useCallback(() => {
    setDelOpen(true);
  }, []);

  const closeDel = useCallback(() => {
    setDelOpen(false);
  }, []);

  const openAdd = useCallback(() => {
    setAddOpen(true);
  }, []);

  const closeAdd = useCallback(() => {
    setAddOpen(false);
  }, []);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:3001/main")
      .then((res) => {
        console.log("info데이터 가져와짐", res.data.tl_info);
        setInfo(res.data.tl_info);
        setOff(res.data.res1); // office관할서
        console.log("관할서 정보 가져오기 : ", res.data.res1);
      })
      .catch(() => {
        console.log("데이터 보내기 실패");
      });
    const mapContainer = document.getElementById("map"); // 지도의 중심좌표
    const mapOption = {
      center: new kakao.maps.LatLng(35.00584710345468, 126.722022616299303), // 지도의 중심좌표
      level: 8, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    setMap(map);
  }, []);

  useEffect(() => {
    // setMap(new kakao.maps.Map(mapContainer, mapOption)); // 지도를 생성합니다
    // 마커를 클릭했을 때 나타나는 이벤트함수입니다.

    // 마커 찍는 함수입니다. (필요)
    for (let i = 0; i < info.length; i++) {
      console.log("tl_pic : ", info[i].tl_pic.data);
      bytes = new Uint8Array(info[i].tl_pic.data);
      blob = new Blob([bytes], { type: "image/bmp" });
      console.log("여기 사진 상태는 뭐니 : ", URL.createObjectURL(blob));
      positions.push({
        title: info[i].tl_name, //신호등 번호(정보)
        address: info[i].tl_location, // 신호등 대략적인 위치
        state: info[i].tl_ai, // ai모드 상태 여부
        pimg: URL.createObjectURL(blob), // 사진 출력
        latlng: new kakao.maps.LatLng(
          Number(info[i].tl_lat),
          Number(info[i].tl_long)
        ), //위도,경도
      });

      displayMarker(i);
    }

    // 지도에 마커를 표시하는 함수입니다(AI mode off)
    function displayMarker(i) {
      if (positions[i].state == "1") {
        var imageSrc = "img/tl.png", // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(60, 70), // 마커이미지의 크기입니다
          imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        // 마커의 이미지를 생성합니다.
        var markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );
      } else {
        var imageSrc = "img/tl2.png", // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(45, 70), // 마커이미지의 크기입니다
          imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        // 마커의 이미지를 생성합니다.
        var markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );
      }

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var marker = new kakao.maps.Marker({
        // 마커가 표시될 지도
        map: map,
        // 마커가 표시될 위치
        position: positions[i].latlng,
        // 마커의 이미지
        image: markerImage,
      });

      // 커스텀오버레이 생성
      var CustomOverlays = new kakao.maps.CustomOverlay({
        yAnchor: 1.45,
        position: marker.getPosition(),
      });

      var Customcontent = document.createElement("div");
      Customcontent.className = "wrap";

      var infos = document.createElement("div");
      infos.className = "info";
      Customcontent.appendChild(infos);

      //타이틀
      var contentTitle = document.createElement("div");
      contentTitle.className = "title";
      contentTitle.appendChild(document.createTextNode(positions[i].title));
      infos.appendChild(contentTitle);

      //닫기 버튼
      var closeBtn = document.createElement("div");
      closeBtn.className = "close";
      closeBtn.setAttribute("title", "닫기");
      closeBtn.onclick = function () {
        CustomOverlays.setMap(null);
      };

      contentTitle.appendChild(closeBtn);

      var bodyContent = document.createElement("div");
      bodyContent.className = "body";
      infos.appendChild(bodyContent);

      var imgDiv = document.createElement("div");
      imgDiv.className = "img";
      bodyContent.appendChild(imgDiv);

      //이미지
      var imgContent = document.createElement("img");
      imgContent.src = positions[i].pimg;
      imgContent.setAttribute("src", positions[i].pimg);

      imgContent.setAttribute("width", "73px");
      imgContent.setAttribute("heigth", "100px");
      imgDiv.appendChild(imgContent);

      var descContent = document.createElement("div");
      descContent.className = "desc";
      bodyContent.appendChild(descContent);

      CustomOverlays.setContent(Customcontent);
      kakao.maps.event.addListener(marker, "click", function () {
        ck_today();
        dfs_xy_conv("toXY", positions[i].latlng.Ma, positions[i].latlng.La);
        take_weather();
        if (ClickOverlay) {
          ClickOverlay.setMap(null);
        }

        CustomOverlays.setMap(map);

        ClickOverlay = CustomOverlays;
        console.log("클릭", ClickOverlay);

        setData(positions[i]);
        sessionStorage.setItem("name", positions[i].title);
        let title = positions[i].title;
        axios
          .post("http://127.0.0.1:3001/problem", {
            title: title,
          })
          .then((res) => {
            console.log("이상내역 데이터 가져와짐", res.data.problem);
            console.log("이상내역 데이터 길이 : ", res.data.problem.length);
            if (res.data.problem.length > 0) {
              setProblem(res.data.problem);
            } else {
              setProblem([
                {
                  error_name: " ",
                  error_date: " ",
                },
              ]);
            }
          })
          .catch(() => {
            console.log("데이터 보내기 실패");
          });
        NavigationInfo2(positions[i].latlng, off);
      });
    }
  }, [info]);

  // 위도경도가져와서 거리값 구하기 - 은유
  function NavigationInfo2(sigg, off) {
    let min_dist_index;
    cnt = [];

    if (off == "") {
      min_dist_index = 0;
      return min_dist_index;
    } else {
      for (let j = 0; j < off.length; j++) {
        let lat1 = sigg.Ma;
        let long1 = sigg.La;
        let lat2 = off[j].offi_lat;
        let long2 = off[j].offi_long;

        var radLat1 = (Math.PI * lat1) / 180;
        var radLat2 = (Math.PI * lat2) / 180;
        var theta = long1 - long2;
        var radTheta = (Math.PI * theta) / 180;
        var dist =
          Math.sin(radLat1) * Math.sin(radLat2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);

        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515 * 1.609344 * 1000;
        if (dist < 100) {
          dist = Math.round(dist / 10) * 10;
        } else {
          dist = Math.round(dist / 100) * 100;
        }
        cnt.push(dist);
      }
      // 깃 테스트 할려고 작성한 주석입니다.
      let tem = cnt[0];
      let num;
      for (let i = 1; i < cnt.length; i++) {
        if (tem > cnt[i]) {
          tem = cnt[i];
          num = i;
        }
      }
      setOffName(off[num].offi_name);
      setOfflocation(off[num].offi_location);
    }
    return 0;
  }

  // //마커클릭시 무언가를 출력하는 함수입니다.
  // Listview();

  function errorlist() {
    let a, b;

    if (problem[0].error_name == " ") {
      a = "최근 이상 내역이 없습니다";
      b = "";
    } else {
      a = problem[0].error_name;
      b = problem[0].error_date.substring(0, 10);
    }
    return [a, b];
  }

  function tlinfonumber() {
    let tlinfonum;
    if (data.title == undefined) {
      tlinfonum = "신호등 번호";
    } else {
      tlinfonum = data.title;
    }
    return tlinfonum;
  }

  function tlinfolocation() {
    let tlinfoloc;
    if (data.address == undefined) {
      tlinfoloc = "신호등 위치";
    } else {
      tlinfoloc = data.address;
    }
    return tlinfoloc;
  }

  return (
    <>
      <div className="main-yoo1">
        <Navs />
        <div className="ssss-parent">
          <div className="ssss">
            {/* 카카오맵 */}
            <div id="map"></div>
          </div>
          <div className="menulist-wrapper">
            <nav className="menulist">
              <div
                style={{
                  position: "absolute",
                  height: "21.21%",
                  width: "100%",
                  top: "-6%",
                  right: "0%",
                  display: "flex",
                  msFlexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  className="police2"
                  style={{
                    zIndex: "50",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    height: "90px",
                  }}
                >
                  <div style={{ position: "absolute", top: "3% ", left: "5%" }}>
                    <div>
                      <b className="weather_title">기온</b> : {temperature}
                      ℃&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <b className="weather_title">습도</b> : {humidity}%
                    </div>
                    <br></br>
                    <div>
                      <b className="weather_title">강수량</b> : {rainfall}
                      mm&nbsp;&nbsp;
                      <b className="weather_title">풍속</b> : {wind_speed}m/s
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="menulist-wrapper">
            <nav className="menulist">
              <div className="columns">
                <div className="police2">
                  <div className="div21">관할서 정보</div>

                  <div className="tittle13">{` ${offName}`}</div>
                  <br></br>
                  <div className="tittle17">{` ${offlocation}`}</div>
                  <div className="morepolice"></div>
                  <div className="morepolice-child" />
                  <div className="morepolice-child" />
                  <img
                    onClick={onMorePoliceContainerClick}
                    className="search-icon5"
                    alt=""
                    src="../16-search-icon5.svg"
                    data-scroll-to="searchIcon"
                  />
                </div>
              </div>
              <div className="error">
                <div className="police-child" />
                <div className="police-child" />
                <div className="columns1">
                  <div className="div22">이상내역</div>
                </div>
                <div className="tittle12">
                  {errorlist()[0]}
                  <br></br>
                  {errorlist()[1]}
                </div>
                <div className="moreerror" onClick={onMoreErrorContainerClick}>
                  <div className="moreerror-child" />
                  <img
                    className="search-icon6"
                    alt="한 개 신호등 이상 내역 아이콘"
                    src="../16-search-icon5.svg"
                  />
                </div>
                <div className="moreerror" onClick={onMoreErrorContainerClick2}>
                  <div className="moreerror-child" />
                  <img
                    className="err_all_search_icon"
                    alt="신호등 이상내역 전체 아이콘"
                    src="../img/tls_error.svg"
                  />
                </div>
              </div>
              <div className="info">
                <div className="police-child" />
                <div className="police-child" />
                <div className="tiaddress"></div>
                <div className="tiaddress1"></div>
                <div className="tlinfo">{tlinfonumber()}</div>
                <div className="columns2">
                  <div className="div23">{tlinfolocation()}</div>
                </div>
                <hr className="line"></hr>
                <div className="aimode1" onClick={openAImode}>
                  <div className="aimode-item" />
                  <div className="aimode-item" />
                  <div className="ai-mode1">AI Mode</div>
                </div>
                <div className="del1" onClick={openDel}>
                  <div className="del-item" />
                  <div className="del-item" />
                  <div className="ai-mode1">삭제</div>
                </div>
              </div>
              <div className="addbtn" onClick={openAdd}>
                <div className="police1"></div>
                <div className="columns3">
                  <div className="ai">AI 신호등 추가</div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {isAImodeOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeAImode}
        >
          <AImode onClose={closeAImode} />
        </PortalPopup>
      )}
      {isDelOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeDel}
        >
          <Del onClose={closeDel} />
        </PortalPopup>
      )}
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

export default MainYoo1;
