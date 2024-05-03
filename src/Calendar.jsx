import Month from "./Month";

const Calendar = ({ yearData }) => {
  return (
    <div className="calendar">
      <h2>{yearData.year}</h2>
      <div className="calendar__wrap">
        <div className="months">
          {Object.keys(yearData).map((month, index) => {
            if (month !== "year") {
              return (
                <Month
                  key={index}
                  monthData={{ name: month, days: yearData[month] }}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
