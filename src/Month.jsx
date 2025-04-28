import Day from "./Day";
import productionCalendar from "./productionСalendar.json";
const Month = ({ monthData }) => {
  const transpose = (arr) => arr[0].map((_, i) => arr.map((row) => row[i]));
  // Получаем текущую дату
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const dayClasses = transpose(monthData.days).map((week) =>
    week.map((day) => {
      const rpodCalendar = productionCalendar;

      let classNames = { day: "day", title: "" };
      const monthIndex = getMonthNumber(monthData.name) + 1;

      if (day !== 0 && day !== undefined) {
        const days = day <= 9 ? "0" + day : day;
        const months = monthIndex <= 9 ? "0" + monthIndex : monthIndex;
        const data = currentYear + "-" + months + "-" + days;
        const calendarEntry = rpodCalendar[data];
        if (calendarEntry) {
          if (rpodCalendar[data].work === "0") {
            classNames.day += " weekend";
            classNames.title = rpodCalendar[data].zag;
          }
          if (rpodCalendar[data].work === "2") {
            classNames.day += " shortened__day";
            classNames.title =
              rpodCalendar[data].type + " " + rpodCalendar[data].zag;
          }
        }
      }
      if (day === currentDay && monthIndex === currentMonth) {
        classNames.day += " current-day";
      } else if (day < currentDay && monthIndex <= currentMonth) {
        classNames.day += " old-day";
      }
      if (monthIndex < currentMonth) {
        classNames.day += " old-day";
      }
      if (day === 0) {
        classNames.day += " empty";
      }

      return classNames;
    })
  );
  const renderWeekdays = () => (
    <div className="weekday">
      <div>ПН</div>
      <div>ВТ</div>
      <div>СР</div>
      <div>ЧТ</div>
      <div>ПТ</div>
      <div>СБ</div>
      <div>ВС</div>
    </div>
  );

  return (
    <div className="month">
      <h3>{monthData.name}</h3>
      <div className="wrap__month">
        {renderWeekdays()}
        <table>
          <tbody>
            {transpose(monthData.days).map((dayColumn, rowIndex) => (
              <tr key={rowIndex}>
                {dayColumn.map((day, dayIndex) => (
                  <Day
                    key={dayIndex}
                    day={day}
                    className={dayClasses[rowIndex][dayIndex]}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Month;

function getMonthNumber(monthName) {
  const months = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];
  return months.findIndex(
    (month) => month.toLowerCase() === monthName.toLowerCase()
  );
}
