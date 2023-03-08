import { Bar } from "react-chartjs-2";
import "./Barch.css";

import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

Chartjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const date = [
  { name: "1분기", 신호등: 1725, AI신호등: 1215 },
  { name: "2분기", 신호등: 2830, AI신호등: 2202 },
  { name: "3분기", 신호등: 2621, AI신호등: 2101 },
  { name: "4분기", 신호등: 1525, AI신호등: 1011 },
];

function Barchart() {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "사고발생률",
        color: "#000000",
        font: {
          size: 20,
          weight: 700,
        },
      },
      legend: {
        // 범례 스타일링
        labels: {
          usePointStyle: true,
          // 범례 도형 모양과 관련된 속성으로, false일 경우엔 기본 직사각형 도형으로 표시됩니다.
          padding: 10,
          color: "#000000",
          // 범례 간 가로 간격을 조정할 수 있습니다. 범례의 상하 padding을 지정하는 기능은 따로 지원되지 않아요. ㅠㅠ
          font: {
            // 범례의 폰트 스타일도 지정할 수 있습니다.
            // family: "'Noto Sans KR', 'serif'",
            size: 12,
            weight: 500,
            lineHeight: 1,
          },
        },
      },
    },
  };

  return (
    <div className="Barchart">
      <Bar
        options={options}
        data={{
          labels: date.map((date) => date.name),
          datasets: [
            {
              label: "신호등",
              data: date.map((date) => date.신호등),
              backgroundColor: "rgba(0, 224, 150, 1)",
            },
            {
              label: "AI신호등",
              data: date.map((date) => date.AI신호등),
              backgroundColor: "rgba(54,162,235)",
            },
          ],
        }}
      />
    </div>
  );
}
export default Barchart;
