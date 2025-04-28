import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const YearlyProgressCircle = ({ daysPassed }) => {
  const year = new Date().getFullYear();
  const totalDaysInYear =
    year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 366 : 365;
  const progressPercentage = (daysPassed / totalDaysInYear) * 100;
  const data = {
    labels: ["Прошло", "Осталось"],
    datasets: [
      {
        label: "Годовой прогресс",
        data: [daysPassed, totalDaysInYear - daysPassed],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };
  return (
    <div className="progressContainer">
      <h2 className="title">Годовой прогресс</h2>
      <div className="chartContainer">
        <Doughnut data={data} />
      </div>
      <p>
        Прошло {daysPassed} дней из {totalDaysInYear}.
      </p>
      <p className="percentageText">
        Процентов {progressPercentage.toFixed(1)} %
      </p>
    </div>
  );
};
export default YearlyProgressCircle;
