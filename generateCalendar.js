import fs from "fs";
function getMondayBasedWeekday(date) {
  return (date.getDay() + 6) % 7;
}

function createCalendar(year) {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // високосный год
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    daysInMonth[1] = 29;
  }

  const calendar = { year };

  months.forEach((monthName, mi) => {
    const dim = daysInMonth[mi];
    const monthArray = [];
    let week = new Array(7).fill(0);
    let wday = getMondayBasedWeekday(new Date(year, mi, 1));

    for (let d = 1; d <= dim; d++) {
      week[wday] = d;
      wday++;
      if (wday === 7) {
        monthArray.push(week);
        week = new Array(7).fill(0);
        wday = 0;
      }
    }
    // остаток последней недели
    if (week.some((v) => v !== 0)) {
      monthArray.push(week);
    }

    calendar[monthName] = monthArray;
  });

  return calendar;
}

const calCurrent = createCalendar(new Date().getFullYear());

fs.writeFileSync(
  "src/calendar.json",
  JSON.stringify(calCurrent, null, 2),
  "utf-8"
);
