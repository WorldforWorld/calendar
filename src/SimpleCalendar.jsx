export const SimpleCalendar = () => {
  const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const today = currentDate.getDate();

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfWeek = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const createMonthDays = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfWeek = getFirstDayOfWeek(year, month);
    const monthDays = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      monthDays.push("");
    }

    for (let day = 1; day <= daysInMonth; day++) {
      monthDays.push(day);
    }

    return monthDays;
  };

  const renderCalendar = () => {
    const months = [];

    for (let month = 0; month < 12; month++) {
      const monthName = new Date(currentYear, month).toLocaleString("default", {
        month: "long",
      });
      const monthDays = createMonthDays(currentYear, month);

      const weeks = [];
      let week = [];
      monthDays.forEach((day, index) => {
        week.push(day);

        if (index % 7 === 0 || index === monthDays.length - 1) {
          weeks.push(week);
          week = [];
        }
      });

      months.push(
        <div key={month} className="month">
          <h3>{monthName}</h3>
          <div className="simple-calendar">
            <div className="weekdays">
              {daysOfWeek.map((day) => (
                <div key={day} className="weekday">
                  {day}
                </div>
              ))}
            </div>
            <div className="days">
              {weeks.map((week, weekIndex) => {
                if (week.length !== 1 || week[0] !== "") {
                  return (
                    <div key={weekIndex} className="week">
                      {week.map((day, dayIndex) => {
                        const isOldDay =
                          month < currentMonth ||
                          (month === currentMonth && day < today);
                        const dayClass = `day ${day === "" ? "empty" : ""}${
                          isOldDay ? " old-day" : ""
                        }${
                          month === currentMonth && day === today
                            ? " current-day"
                            : ""
                        }`;
                        return (
                          <div key={dayIndex} className={dayClass}>
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      );
    }

    return months;
  };

  return <div className="calendar">{renderCalendar()}</div>;
};
