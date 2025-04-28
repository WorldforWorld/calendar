import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

async function parseCalendar() {
  const url = "https://chelyabinsk.hh.ru/calendar";

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "ru-RU,ru;q=0.9",
      },
      maxRedirects: 5,
    });

    const $ = cheerio.load(data);
    const calendar = {};

    $(".calendar-list__item").each((monthIndex, monthEl) => {
      const monthNum = String(monthIndex + 1).padStart(2, "0");
      $(monthEl)
        .find(".calendar-list__numbers__item")
        .each((_, dayEl) => {
          const $day = $(dayEl);
          const text = $day.clone().children().remove().end().text().trim();
          if (!text || text === "0") return;

          const dayNum = String(text).padStart(2, "0");
          const date = `2025-${monthNum}-${dayNum}`;

          let work = "1";
          let type = "рабочий день";
          let zag = "Календарный рабочий день";

          if ($day.hasClass("calendar-list__numbers__item_day-off")) {
            work = "0";
            type = "выходной день";
            const hint = $day.find(".calendar-hint").text().trim();
            zag = hint || "Выходной день";
          } else if ($day.hasClass("calendar-list__numbers__item_shortened")) {
            work = "2";
            type = "рабочий день (сокращенный)";
            const hint = $day.find(".calendar-hint").text().trim();
            zag = hint || "Предпраздничный день";
          }

          // Сохраняем ТОЛЬКО выходные и сокращенные дни
          if (work !== "1") {
            calendar[date] = { day: date, work, type, zag };
          }
        });
    });

    fs.writeFileSync(
      "src/productionСalendar.json",
      JSON.stringify(calendar, null, 2),
      "utf-8"
    );
    console.log("Готово: productionСalendar.json");
  } catch (err) {
    console.error("Ошибка при парсинге:", err);
  }
}

parseCalendar();
