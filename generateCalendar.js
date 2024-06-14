// Скрипт генерирующий календарь в формате json вот такого вида:
/* {
  "year": 2024,
  "Январь": [
    [0, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, 0, 0, 0]
  ],
  ---
 */
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

  // Check for leap year and adjust February days
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    daysInMonth[1] = 29;
  }

  let calendar = {
    year: year,
  };

  months.forEach((month, index) => {
    let monthArray = [];
    let firstDay = new Date(year, index, 1).getDay(); // Day of the week the month starts on
    let days = daysInMonth[index];
    let week = new Array(7).fill(0);

    // Fill the first week with leading zeros until the first day
    for (let i = 0; i < firstDay; i++) {
      week[i] = 0;
    }

    // Fill the days of the month
    for (let day = 1; day <= days; day++) {
      week[firstDay] = day;
      firstDay++;
      if (firstDay === 7) {
        monthArray.push(week);
        week = new Array(7).fill(0);
        firstDay = 0;
      }
    }

    // Fill the last week with trailing zeros if necessary
    if (week.some((day) => day !== 0)) {
      monthArray.push(week);
    }

    calendar[month] = monthArray;
  });

  return calendar;
}

const currentYear = new Date().getFullYear();
const calendar2024 = createCalendar(currentYear);

// А здесь создать файл формата json с календарём текущего года и поместить туда все эти данные.
console.log(JSON.stringify(calendar2024, null, 2));
