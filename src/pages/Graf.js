// import { useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import "./Graf.css";
import Barchart from "../components/Barch";
import Barchart1 from "../components/Barch1";
import GrafBox from "../components/GrafBox";
import Navs from "../components/Navs";

const Graf = () => {
  return (
    <div className="graf">
      <Navs />
      <div className="total-revenue-wrapper">
        <div className="total-revenue">
          <div className="allgraf">
            <GrafBox />
            <Barchart />
            {/* <h1 className="text1">사고 발생율</h1> */}
          </div>

          <div className="graf2">
            <Barchart1 />
            {/* <h1 className="text2">차량 통행량</h1> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graf;
